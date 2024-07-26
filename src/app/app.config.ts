import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './components/auth/state/auth.reducer';
import { todoReducer } from './components/todo-list/state/todo.reducer';
import { AuthEffects } from './components/auth/state/auth.effects';
import { TodoEffects } from './components/todo-list/state/todo.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      StoreModule.forRoot({ auth: authReducer, todos: todoReducer }),
      EffectsModule.forRoot([AuthEffects, TodoEffects]),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false })
    ),
  ],
};