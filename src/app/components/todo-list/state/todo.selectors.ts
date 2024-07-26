import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState, adapter } from './todo.reducer';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

const { selectAll } = adapter.getSelectors();

export const selectAllTodos = createSelector(
  selectTodoState,
  selectAll
);

export const selectIsLoading = createSelector(
  selectTodoState,
  (state) => state.isLoading
);