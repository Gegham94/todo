import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ITodo } from '../models/todo.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private authService: AuthService) {}

  getTodos(): Observable<ITodo[]> {
    const currentUser = this.authService.getCurrentUserSync();
    if (currentUser) {
      const userTodos = JSON.parse(localStorage.getItem(`todos_${currentUser.id}`) || '[]');
      return of(userTodos).pipe(delay(200));
    }
    return of([]);
  }

  saveTodos(todos: ITodo[]): void {
    const currentUser = this.authService.getCurrentUserSync();
    if (currentUser) {
      localStorage.setItem(`todos_${currentUser.id}`, JSON.stringify(todos));
    }
  }
}
