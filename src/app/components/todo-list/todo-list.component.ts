import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Subject, debounceTime } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';

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
export class TodoListComponent {
  private searchSubject: Subject<string> = new Subject();
  animationClass: string = '';
  newTodo: string = '';
  searchText: string = '';
  searchPlaceholder: string = 'Search Todos';
  todos: { text: string; done: boolean }[] = [
    { text: 'Doing todo task 1', done: false },
    { text: 'Doing todo task 2', done: false },
    { text: 'Doing todo task 3', done: false },
    { text: 'Doing todo task 4', done: false },
    { text: 'Doing todo task 5', done: false },
    { text: 'Doing todo task 6', done: false },
    { text: 'Doing todo task 7', done: false },
    { text: 'Doing todo task 8', done: false },
    { text: 'Doing todo task 9', done: false },
    { text: 'Doing todo task 10', done: false },
    { text: 'Doing todo task 11', done: false },
    { text: 'Doing todo task 12', done: false },
    { text: 'Doing todo task 13', done: false },
    { text: 'Doing todo task 14', done: false },
    { text: 'Doing todo task 15', done: false },
    { text: 'Doing todo task 16', done: false },
    { text: 'Doing todo task 17', done: false },
    { text: 'Doing todo task 18', done: false },
    { text: 'Doing todo task 19', done: false },
    { text: 'Doing todo task 20', done: false },
    { text: 'Doing todo task 21', done: false },
    { text: 'Doing todo task 22', done: false },
    { text: 'Doing todo task 23', done: false },
    { text: 'Doing todo task 24', done: false },
    { text: 'Doing todo task 25', done: false },
    { text: 'Doing todo task 26', done: false },
    { text: 'Doing todo task 27', done: false },
    { text: 'Doing todo task 28', done: false },
    { text: 'Doing todo task 29', done: false },
    { text: 'Doing todo task 30', done: false },
  ];
  filteredTodos: { text: string; done: boolean }[] = [...this.todos];
  paginatedTodos: { text: string; done: boolean }[] = [];
  isEditing: boolean = false;
  editTodoIndex: number | null = null;
  editTodoText: string = '';
  isLoading: boolean = false;
  previousPage: number = 0;
  currentPage: number = 0;
  itemsPerPage: number = 8;

  isConfirmDialogOpen: boolean = false;
  todoIndexToDelete: number | null = null;

  constructor() {
    this.searchSubject.pipe(debounceTime(400)).subscribe((searchText) => {
      this.updateFilteredTodos(searchText);
      this.isLoading = false;
    });
    this.updatePaginatedTodos();
  }

  private updateFilteredTodos(searchText?: string) {
    const text = searchText !== undefined ? searchText : this.searchText;
    this.filteredTodos = this.todos.filter((todo) =>
      todo.text.toLowerCase().includes(text.toLowerCase())
    );
    this.updatePaginatedTodos();
  }

  private updatePaginatedTodos() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTodos = this.filteredTodos.slice(start, end);
  }

  private resetEditState() {
    this.isEditing = false;
    this.editTodoIndex = null;
    this.editTodoText = '';
  }

  private refreshTodos() {
    this.updateFilteredTodos();
    this.updatePaginatedTodos();
    this.searchTodos();
  }

  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      (this.isEditing && !target.closest('.edit-todo-item')) ||
      (this.isConfirmDialogOpen && !target.closest('.confirm-dialog'))
    ) {
      this.resetEditState();
      this.closeConfirmDialog();
    }
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.unshift({ text: this.newTodo, done: false });
      this.newTodo = '';
      this.refreshTodos();
      this.closeConfirmDialog();
    }
  }

  openConfirmDialog(index: number) {
    this.todoIndexToDelete = index;
    this.isConfirmDialogOpen = true;
  }

  closeConfirmDialog() {
    this.isConfirmDialogOpen = false;
    this.todoIndexToDelete = null;
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.refreshTodos();
  }

  confirmDelete() {
    if (this.todoIndexToDelete !== null) {
      this.removeTodo(this.todoIndexToDelete);
      this.closeConfirmDialog();
    }
  }

  toggleDone(index: number) {
    this.todos[index].done = !this.todos[index].done;
  }

  openEditModal(index: number) {
    this.isEditing = true;
    this.editTodoIndex = index;
    this.editTodoText = this.todos[index].text;
  }

  saveEdit() {
    if (this.editTodoIndex !== null) {
      this.todos[this.editTodoIndex].text = this.editTodoText;
      this.resetEditState();
      this.refreshTodos();
    }
  }

  searchTodos() {
    this.isLoading = true;
    this.searchSubject.next(this.searchText);
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
      this.updatePaginatedTodos();
      if (this.currentPage > this.previousPage) {
        this.animationClass = 'slide-in-right';
      } else {
        this.animationClass = 'slide-in-left';
      }
    }, 300);
  }
}
