import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../enviroments/enviroment';
import { LogFilter } from '../interfaces/logs';
const LOGURL=environment.apiUrl +  "/logs"

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private http: HttpClient) {}

   page(
    filter: LogFilter,
    page: number,
    pageSize: number,
    sortColumn: string,
    sortDirection: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', (page - 1).toString())
      .set('size', pageSize.toString())
      .set('sort', `${sortColumn},${sortDirection}`);

     Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });
  return this.http.get<any>(`${LOGURL}/page`, { params });
}
  undo(id: number): Observable<any> {
    return this.http.delete<any>(`${LOGURL}/${id}/undo`);
  }
}