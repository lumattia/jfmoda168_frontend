import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../enviroments/enviroment';
import { StockUpdateRequest } from '../interfaces/product';
const COLORURL=environment.apiUrl +  "/colors"

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http:HttpClient) {
  }
  addStock(request: StockUpdateRequest): Observable<any> {
    return this.http.post(`${COLORURL}/add`, request);
  }

  removeStock(request: StockUpdateRequest): Observable<any> {
    return this.http.post(`${COLORURL}/remove`, request);
  }
}
