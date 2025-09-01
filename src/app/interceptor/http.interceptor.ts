import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from "../services/storage.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.storageService.getUser();
    if (user && Object.keys(user).length) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${user.token}` }
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0 && error.error instanceof ProgressEvent) {
          return throwError(()=>"Something has gone wrong");
        }
        let errorMessage = 'Ha ocurrido un error en la aplicación';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = `Código de error: ${error.status}, mensaje: ${error.error}`;
        }
        return throwError(()=>errorMessage);
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
