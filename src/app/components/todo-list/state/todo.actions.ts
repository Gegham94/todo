import { createAction, props } from '@ngrx/store';
import { ITodo } from '../../../models/todo.interface';

export const addTodo = createAction('[Todo] Add Todo', props<{ todo: ITodo }>());
export const deleteTodo = createAction('[Todo] Delete Todo', props<{ id: string }>());
export const updateTodo = createAction('[Todo] Update Todo', props<{ todo: ITodo }>());
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: ITodo[] }>());