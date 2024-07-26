import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { ITodo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$: Observable<ITodo[]> = of([
    { id: '8b3x2f1a3c9b8a4d0f2a5b1c5d8c6a1e', text: 'Doing todo task 1', done: false },
    { id: '0b3e2f1a3c9b8e1d9f2a5b1c4d8f6a1p', text: 'Doing todo task 2', done: false },
    { id: '9b3dbgn4juh7dfghngjf3e29lkhjkkdn', text: 'Doing todo task 3', done: false },
    { id: '7b3e2f1a3c9b8e3d9f2a5b1c7d8f6a1m', text: 'Doing todo task 4', done: false },
    { id: '5b3e2f1a4yhsdnns9f2a5b1c4d8f6a1l', text: 'Doing todo task 5', done: false },
    { id: '1b3e2f1a3c9b8e6d9f2a5b1c3d8f6a1k', text: 'Doing todo task 6', done: false },
    { id: '4h3e2f1a3c7b8e8d9f2n5b1c7d8f6a1j', text: 'Doing todo task 7', done: false },
    { id: '7d3e2f1a3c54hdjd9f2e5b1c4d8f6a1i', text: 'Doing todo task 8', done: false },
    { id: '7b3e2f1a5c3b8e9d9f2q5b1c8d8f6a1h', text: 'Doing todo task 9', done: false },
    { id: '7l3e2f1a3c9b8e0d9f2a5b1c4d8f6a1g', text: 'Doing todo task 10', done: false },
    { id: '7k3e2f53h34sdfhhhf2a5b1c2d8f6a1f', text: 'Doing todo task 11', done: false },
    { id: '6b3e2f1a3c9b18ed9f2a5b1c2d8f6a1d', text: 'Doing todo task 12', done: false },
    { id: '743e2f13c9b8e7d9f2a5b1c4d48f6a1c', text: 'Doing todo task 13', done: false },
    { id: '7f3e2f1e3c1b8e7d9f2a5b1c4d8f6a1b', text: 'Doing todo task 14', done: false },
    { id: '8e3e2f1a3c9b8e7d9f2a7b1c4d8f6a1a', text: 'Doing todo task 15', done: false },
    { id: '8e3e2aq1d3c9b8ezxf7d9f3jmdf2a7b1', text: 'Doing todo task 16', done: false },
    { id: '234dfbzxa1d3c9b8ef7d9f5nhsdsdfh2', text: 'Doing todo task 17', done: false },
    { id: '4gbxxkt2a1d3c9b8ef7d9f3425gk3m7m', text: 'Doing todo task 18', done: false },
    { id: 'bnr6kt2a1d3c9b8ef7d94gndhymk44h2', text: 'Doing todo task 19', done: false },
    { id: 'bh523gh75c9b8ef7dhhy56kh556nj4h0', text: 'Doing todo task 19', done: false },
  ]);

  getTodos() {
    return this.todos$.pipe(
      switchMap((data) => {
        return of(data).pipe(delay(200));
      })
    )
  }
}
