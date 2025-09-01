import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../enviroments/enviroment';
const USUARIOURL=environment.apiUrl +  "/users"

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http:HttpClient) {
  }
  cambiarContrasenia(oldPassword:string, newPassword:string){
    const url = `${USUARIOURL}/changePassword`;
    return this.http.put(url,{oldPassword,newPassword},HTTPOPTIONS);
  }
}
