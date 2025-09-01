import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import {httpInterceptorProviders} from "./interceptor/http.interceptor";

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Nora from '@primeuix/themes/nora';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders,
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Nora
            }
        })
  ]
};
