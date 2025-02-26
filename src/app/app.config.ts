import { ApplicationConfig, isDevMode, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { employeReducer } from './store/employe.reducers';
import { EmployeEffect } from './store/employe.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(), //injection de HttpClient pour es appels Http
    provideToastr(),
    provideStore({'emp' : employeReducer}),
    provideEffects([EmployeEffect]),
    provideStoreDevtools({ maxAge : 25, logOnly : !isDevMode() }),
    {provide : MAT_DATE_LOCALE, useValue : 'fr-FR'} //permet d'avoir les champs date en français lors de création employé
  ]
};
