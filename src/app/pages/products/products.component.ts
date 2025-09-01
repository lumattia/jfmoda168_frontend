import { Component } from '@angular/core';
import { PageProduct, Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-products',
    imports: [FormsModule, NgIf, NgFor, NgbPaginationModule, RouterLink, NgClass],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: PageProduct[] = [];
  totalItems = 0;
  searchTerm: string = "";
  page = 0;
  size = 10;
  sortColumn = '';
  sortDirection = '';

  constructor(private productService: ProductService) {
    this.pageChanged();
  }

  pageChanged() {
    this.productService.pageProducts(this.searchTerm, this.page, this.size, this.sortColumn, this.sortDirection).subscribe({
      next: (data) => {
        this.products = (data.content as PageProduct[])
        this.page = data.pageable.pageNumber + 1
        this.totalItems = data.totalElements
      },
      error: (err) => console.error(err)
    });
  }
    onSort(column:string) {
    if (this.sortColumn==column)
      if (this.sortDirection=="desc")
        this.sortColumn="";
      else
        this.sortDirection = this.sortDirection =="asc"?"desc":"asc";
    else{
      this.sortColumn=column
      this.sortDirection = "asc";
    }
    this.pageChanged()
  }
}
