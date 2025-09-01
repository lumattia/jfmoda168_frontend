import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location, NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Color, Material, Product } from '../../interfaces/product';
import { environment } from '../../../enviroments/enviroment';

@Component({
    selector: 'app-product-detail',
    imports: [ReactiveFormsModule, NgIf, NgFor],
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  location = inject(Location);
  productService = inject(ProductService);

  productForm!: FormGroup;
  productId: number = 0;
  previewColor?: any; // 用来存放当前放大的图片

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = Number(params['id']) || 0;
      if (this.productId) {
        this.productService.getProduct(this.productId).subscribe(product => {
          this.initForm(product);
        });
      } else {
        this.initForm(); // nuevo producto
      }
    });
  }

  initForm(product?: Product) {
    this.productForm = this.fb.group({
      id: [product?.id || null],
      code: [product?.code || ''],
      name: [product?.name || ''],
      materials: this.fb.array(
        (product?.materials || []).map(mat => this.createMaterial(mat))
      )
    });
  }

  createMaterial(material?: Material): FormGroup {
    return this.fb.group({
      id: [material?.id || null],
      name: [material?.name || ''],
      colors: this.fb.array(
        (material?.colors || []).map(col => this.createColor(col))
      )
    });
  }

  createColor(color?: Color): FormGroup {
    return this.fb.group({
      id: [color?.id || null],
      name: [color?.name || ''],
      stock: [color?.stock || 0],
      photoPath: [color?.photoPath?environment.fileUrl+color.photoPath : ''], // mostrar foto existente
      fileBase64: [null],
      filename: [null]
    });
  }

  get materials(): FormArray {
    return this.productForm.get('materials') as FormArray;
  }

  colorsOf(materialIndex: number): FormArray {
    return this.materials.at(materialIndex).get('colors') as FormArray;
  }

  addMaterial() {
    this.materials.push(this.createMaterial());
  }

  addColor(materialIndex: number) {
    this.colorsOf(materialIndex).push(this.createColor());
  }

removeMaterial(index: number) {
  const material = this.materials.at(index);
  if (!material.value.id) {
    this.materials.removeAt(index);
  }
}

removeColor(mi: number, ci: number) {
  const colors = this.colorsOf(mi);
  const color = colors.at(ci);
  if (!color.value.id) {
    colors.removeAt(ci);
  }
}
onFileSelected(event: Event, mi: number, ci: number) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    // ✅ 预览用 DataURL
    const reader = new FileReader();
    var color = this.colorsOf(mi).at(ci);
    reader.onload = () => {
      color.patchValue({ photoPath: reader.result });
      color.patchValue({ fileBase64: reader.result });
      color.patchValue({ filename: file.name });
    };
    reader.readAsDataURL(file);
    color.patchValue({ file });
  }
}


  save() {
    this.productService.saveProduct(this.productForm.value).subscribe({
      next: () => this.location.back(),
      error: err => alert(err)
    });
  }

  cancel() {
    this.location.back();
  }
  openImage(color: any) {
    this.previewColor = color;
  }

  closeImage() {
    this.previewColor = undefined;
  }
  removeColorPhoto(){
      this.previewColor.patchValue({ photoPath: "" });
      this.previewColor.patchValue({ fileBase64: "" });
      this.previewColor.patchValue({ filename: "" });
  }
}
