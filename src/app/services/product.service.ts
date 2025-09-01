import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { IdName } from '../interfaces/idname';
import { Product } from '../interfaces/product';

const PRODUCTURL = environment.apiUrl + "/products"

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  pageProducts(searchTerm: string, page: number, pageSize: number, sortColumn: string, sortDirection: string): Observable<any> {
    const url = `${PRODUCTURL}/page`
    let options = {
      params: new HttpParams().set("code", searchTerm)
        .set("page", page - 1)
        .set("size", pageSize)
        .set("sort", sortColumn + "," + sortDirection)
    }
    return this.http.get<any>(url, options)
  }
  //Métodos (incluir tipos correctos en los argumentos)
  getProducts(): Observable<IdName[]> {
    return this.http.get<IdName[]>(PRODUCTURL);
  }
  saveProduct(dto: Product): Observable<any> {
    const formData = new FormData();


    return this.http.post(PRODUCTURL, dto);
  }
  getProduct(id: number): Observable<any> {
    const url = `${PRODUCTURL}/${id}`
    return this.http.get<any>(url);
  }
}
