import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideStore(), provideRouter(routes)],
};
