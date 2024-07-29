import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { BehaviorSubject, tap } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { selectAllTodos } from './state/todo.selectors';
import { ITodo } from '../../models/todo.interface';
import { Store } from '@ngrx/store';
import {
  addTodo,
  deleteTodo,
  loadTodos,
  updateTodo,
} from './state/todo.actions';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
    LoaderComponent,
    PaginatorModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todos$ = new BehaviorSubject<ITodo[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(true);
  filteredTodos!: ITodo[];
  paginatedTodos!: ITodo[];
  newTodo: string = '';
  searchText: string = '';
  animationClass: string = '';
  searchPlaceholder: string = 'Search Todos';
  isEditing: boolean = false;
  editTodoIndex: number | null = null;
  editTodoText: string = '';
  previousPage: number = 0;
  currentPage: number = 0;
  itemsPerPage: number = 8;
  isConfirmDialogOpen: boolean = false;
  todoIndexToDelete: number | null = null;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.isLoading$.next(true);
    this.store.dispatch(loadTodos());
    this.store.select(selectAllTodos).pipe(
      tap((todos) => {
        this.todos$.next(todos);
        this.updateFilteredTodos();
      })
    ).subscribe();
  }

  addNewTodo() {
    if (this.newTodo.trim()) {
      const newTodo: ITodo = {
        id: this.generateTodoId(),
        title: this.newTodo,
        done: false,
      };
      this.store.dispatch(addTodo({ todo: newTodo }));
      this.newTodo = '';
      this.updateFilteredTodos();
    }
  }

  private updatePaginatedTodos() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTodos = this.filteredTodos.slice(start, end);
    if (this.paginatedTodos !== null || this.paginatedTodos !== undefined) {
      setTimeout(() => {
        this.isLoading$.next(false);
      }, 1000);
    }
  }

  updateFilteredTodos() {
    this.filteredTodos = this.todos$.value.filter((todo) =>
      todo.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePaginatedTodos();
  }

  openConfirmDialog(index: number) {
    this.todoIndexToDelete = index;
    this.isConfirmDialogOpen = true;
  }

  closeConfirmDialog() {
    this.isConfirmDialogOpen = false;
    this.todoIndexToDelete = null;
  }

  confirmDelete() {
    if (this.todoIndexToDelete !== null) {
      const todoToRemove = this.filteredTodos[this.todoIndexToDelete];
      this.store.dispatch(deleteTodo({ id: todoToRemove.id }));
      this.closeConfirmDialog();
    }
  }

  generateTodoId() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    const id = Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    return id;
  }

  private resetEditModal() {
    this.isEditing = false;
    this.editTodoIndex = null;
    this.editTodoText = '';
  }

  public setTooltipValue(text: string): string {
    return `Mark "${text}" as DONE`;
  }

  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      (this.isEditing && !target.closest('.edit-todo-item')) ||
      (this.isConfirmDialogOpen && !target.closest('.confirm-dialog'))
    ) {
      this.resetEditModal();
      this.closeConfirmDialog();
    }
  }

  toggleDone(todo: ITodo) {
    const updatedTodo = { ...todo, done: !todo.done };
    this.store.dispatch(updateTodo({ todo: updatedTodo }));
  }

  openEditModal(index: number) {
    this.isEditing = true;
    this.editTodoIndex = index;
    this.editTodoText = this.filteredTodos[index].title;
  }

  saveEdit() {
    if (this.editTodoIndex !== null) {
      const todo = this.filteredTodos[this.editTodoIndex];
      const updatedTodo = { ...todo, text: this.editTodoText };
      this.store.dispatch(updateTodo({ todo: updatedTodo }));
      this.resetEditModal();
      this.updateFilteredTodos();
    }
  }

  onPageChange(event: any) {
    this.previousPage = this.currentPage;
    this.currentPage = event.page;
    if (this.currentPage > this.previousPage) {
      this.animationClass = 'slide-out-left';
    } else {
      this.animationClass = 'slide-out-right';
    }
    setTimeout(() => {
      if (this.currentPage > this.previousPage) {
        this.animationClass = 'slide-in-right';
      } else {
        this.animationClass = 'slide-in-left';
      }
    }, 200);
    this.updatePaginatedTodos();
  }
}
