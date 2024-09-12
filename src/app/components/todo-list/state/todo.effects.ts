import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodoService } from '../../../services/todo.service';
import { Store } from '@ngrx/store';
import { selectAllTodos } from './todo.selectors';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.loadTodos),
    mergeMap(() => this.todoService.getTodos().pipe(
      map(todos => TodoActions.loadTodosSuccess({ todos })),
      catchError(error => of({ type: '[Todo] Load Todos Failure', error }))
    ))
  ));

  saveTodos$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.addTodo, TodoActions.deleteTodo, TodoActions.updateTodo),
    tap(() => {
      this.store.select(selectAllTodos).subscribe(todos => {
        this.todoService.saveTodos(todos);
      });
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private store: Store
  ) {}
}