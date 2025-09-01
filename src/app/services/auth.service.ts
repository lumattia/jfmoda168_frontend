import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {StorageService} from "./storage.service";
import {Observable} from "rxjs";
import {Usuario} from "../interfaces/usuario";
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiAuthURL = environment.apiUrl +  "/auth/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }



  login(username: string, password: string): Observable<Usuario> {
    console.log(environment)
    return this.httpClient.post<Usuario>(
      this.apiAuthURL + 'login',
      {
        username,
        password,
      },
      this.httpOptions
    );
  }
  logout() {
    this.storageService.clean();
  }

}
