import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IdName } from '../../interfaces/idname';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Color, Material, Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { AutoCompleteModule,AutoCompleteSelectEvent,AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { NgIf } from '@angular/common';
import { environment } from '../../../enviroments/enviroment';

@Component({
    selector: 'tr[app-stock-update-row]',
    imports: [AutoCompleteModule, ReactiveFormsModule, NgIf],
    templateUrl: './stock-update-row.component.html',
    styleUrl: './stock-update-row.component.css'
})
export class StockUpdateRowComponent {
  @Input() rowForm!: FormGroup;
  @Input() products: IdName[] = [];
  @Output() remove = new EventEmitter<void>();
  @Output() preview = new EventEmitter<string>();
  
  filteredProducts:  IdName[] = [];
  filteredMaterial:  Material[] = [];
  filteredColor:  Color[] = [];
  selectedProduct?: Product;
  selectedMaterial?: Material;
  selectedColor?: Color;

  constructor(private productService: ProductService) {}

  getControl(control:string){
    return this.rowForm.get(control) as FormControl
  }
  onProductChange(event?: number|AutoCompleteSelectEvent) {
    let productId = this.getNumber(event);
    if (productId == this.selectedProduct?.id) return;
    this.selectedProduct = undefined;
    if (productId != undefined) {
      this.productService.getProduct(productId).subscribe(product => {
        this.selectedProduct = product;
        this.onMaterialChange(this.selectedMaterial?.id);
      });
    }
  }

  onMaterialChange(event?: number|AutoCompleteSelectEvent) {
    let materialId= this.getNumber(event);
    if (materialId == this.selectedMaterial?.id) return;
    this.selectedMaterial = this.selectedProduct?.materials.find(m => m.id === materialId);
    this.onColorChange(this.selectedColor?.id);
  }

  onColorChange(event?: number|AutoCompleteSelectEvent) {
    let colorId= this.getNumber(event);
    if (colorId == this.selectedColor?.id) return;
    this.selectedColor = this.selectedMaterial?.colors.find(c => c.id === colorId);
    this.rowForm.patchValue({
        id: this.selectedColor?.id,
        currentStock: this.selectedColor?.stock,
        photoPath: this.selectedColor?.photoPath?environment.fileUrl+this.selectedColor.photoPath:undefined
    });
  }
  getNumber(event?: number|AutoCompleteSelectEvent){
    return  typeof event === 'object'?event.value.id:event
  }
  filterProduct(event:AutoCompleteCompleteEvent){
    this.filteredProducts = this.products.filter(item => item.name.toLowerCase().includes(event.query.toLowerCase()));
  }
  
  filterMaterial(event:AutoCompleteCompleteEvent){
    this.filteredMaterial = this.selectedProduct?.materials.filter(item => item.name.toLowerCase().includes(event.query.toLowerCase()))  ?? [];
  }
  
  filterColor(event:AutoCompleteCompleteEvent){
    this.filteredColor = this.selectedMaterial?.colors.filter(item => item.name.toLowerCase().includes(event.query.toLowerCase())) ?? [];
  }

  
}