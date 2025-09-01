import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ColorService } from '../../services/color.service';
import { ProductService } from '../../services/product.service';
import { StockUpdateRowComponent } from '../stock-update-row/stock-update-row.component';
import { CommonModule } from '@angular/common';
import { StockUpdateRequest } from '../../interfaces/product';

@Component({
    selector: 'app-stock-update',
    imports: [CommonModule, ReactiveFormsModule, StockUpdateRowComponent],
    templateUrl: './stock-update.component.html',
    styleUrl: './stock-update.component.css'
})
export class StockUpdateComponent implements OnInit {
  form: FormGroup;
  products: any[] = []; // 完整产品对象，带布料和颜色
  previewPhoto?: string; // 用来存放当前放大的图片
  action: string = "add";
  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private colorService: ColorService) {
    this.form = this.fb.group({
      date: [new Date().toISOString().slice(0, 10), Validators.required],
      items: this.fb.array([])
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products = res; // 假设返回包含 materials/colors
    });
    this.addRow();
  }

  get items(): FormArray { return this.form.get('items') as FormArray; }
  get itemGroups(): FormGroup[] { return this.items.controls as FormGroup[]; }

  addRow() {
    const row = this.fb.group({
      id: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      currentStock: [{ value: 0, disabled: true }],
      photoPath: [''],
    });
    this.items.push(row);
  }

  removeRow(index: number) {
    this.items.removeAt(index);
  }

  // ----------------- 过滤 -----------------
  filterProducts(rowIndex: number, keyword: string) {
    const arr = this.products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
  }

  submit() {
    if (this.form.invalid) return;
    const request: StockUpdateRequest = {
      date: this.form.value.date,
      stock: this.items.value.map((row: any) => ({
        id: row.id,
        amount: row.amount
      }))
    };
    if (this.action === 'add') this.colorService.addStock(request).subscribe(res => {
      this.form = this.fb.group({
        date: [new Date().toISOString().slice(0, 10), Validators.required],
        items: this.fb.array([])
      });
      this.addRow();
    });
    else this.colorService.removeStock(request).subscribe(res => {
      this.form = this.fb.group({
        date: [new Date().toISOString().slice(0, 10), Validators.required],
        items: this.fb.array([])
      });
      this.addRow();
    });
  }
  openImage(color: string) {
    this.previewPhoto = color
  }
  closeImage() {
    this.previewPhoto = undefined;
  }
}
