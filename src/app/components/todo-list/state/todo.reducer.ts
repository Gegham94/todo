import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as TodoActions from './todo.actions';
import { ITodo } from '../../../models/todo.interface';

export interface TodoState extends EntityState<ITodo> {
  isLoading: boolean;
}

export const adapter: EntityAdapter<ITodo> = createEntityAdapter<ITodo>();

export const initialState: TodoState = adapter.getInitialState({
  isLoading: false,
});

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => ({ ...state, isLoading: true })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => adapter.setAll(todos, { ...state, isLoading: false })),
  on(TodoActions.addTodo, (state, { todo }) => {
    const newState = adapter.addOne(todo, state);
    const allIds = newState.ids as string[];
    const newIds = [todo.id, ...allIds.filter(id => id !== todo.id)];
    return { ...newState, ids: newIds };
  }),
  on(TodoActions.deleteTodo, (state, { id }) => adapter.removeOne(id, state)),
  on(TodoActions.updateTodo, (state, { todo }) => adapter.updateOne({ id: todo.id, changes: todo }, state)),
);