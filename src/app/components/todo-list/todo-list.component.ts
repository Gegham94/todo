import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Subject, debounceTime } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
    LoaderComponent,
    PaginatorModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  private searchSubject: Subject<string> = new Subject();
  newTodo: string = '';
  searchText: string = '';
  searchPlaceholder: string = 'Search Todos';
  todos: { text: string, done: boolean }[] = [];
  // todos: { text: string, done: boolean }[] = [
  //   { text: 'Doing todo task 1', done: false },
  //   { text: 'Doing todo task 2', done: false },
  //   { text: 'Doing todo task 3', done: false },
  //   { text: 'Doing todo task 4', done: false },
  //   { text: 'Doing todo task 5', done: false },
  //   { text: 'Doing todo task 6', done: false },
  //   { text: 'Doing todo task 7', done: false },
  //   { text: 'Doing todo task 8', done: false },
  //   { text: 'Doing todo task 9', done: false },
  //   { text: 'Doing todo task 10', done: false },
  //   { text: 'Doing todo task 11', done: false },
  //   { text: 'Doing todo task 12', done: false },
  //   { text: 'Doing todo task 13', done: false },
  //   { text: 'Doing todo task 14', done: false },
  //   { text: 'Doing todo task 15', done: false },
  //   { text: 'Doing todo task 16', done: false },
  //   { text: 'Doing todo task 17', done: false },
  //   { text: 'Doing todo task 18', done: false },
  //   { text: 'Doing todo task 19', done: false },
  //   { text: 'Doing todo task 20', done: false },
  // ];
  filteredTodos: { text: string, done: boolean }[] = [...this.todos];
  paginatedTodos: { text: string, done: boolean }[] = [];
  isEditing: boolean = false;
  editTodoIndex: number | null = null;
  editTodoText: string = '';
  isLoading: boolean = false;
  currentPage: number = 0;

  itemsPerPage: number = 8;

  constructor() {
    this.searchSubject.pipe(debounceTime(400)).subscribe(searchText => {
      this.filteredTodos = this.todos.filter(todo => 
        todo.text.toLowerCase().includes(searchText.toLowerCase())
      );
      this.updateFilteredTodos(searchText);
      this.isLoading = false;
    });
    this.updatePaginatedTodos();
  }

  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isEditing && !target.closest('.edit-todo-item')) {
      this.isEditing = false;
      this.editTodoIndex = null;
      this.editTodoText = '';
    }
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push({ text: this.newTodo, done: false });
      this.newTodo = '';
    }
    this.updateFilteredTodos();
    this.updatePaginatedTodos();
    this.searchTodos();
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.updateFilteredTodos();
    this.updatePaginatedTodos();
    this.searchTodos();
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
      this.isEditing = false;
      this.editTodoIndex = null;
      this.editTodoText = '';
    }
    this.updatePaginatedTodos();
    this.searchTodos();
  }

  searchTodos() {
    this.isLoading = true;
    this.searchSubject.next(this.searchText);
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.updatePaginatedTodos();
  }

  updateFilteredTodos(searchText?: string) {
    const text = searchText !== undefined ? searchText : this.searchText;
    this.filteredTodos = this.todos.filter(todo => 
      todo.text.toLowerCase().includes(text.toLowerCase())
    );
    this.updatePaginatedTodos();
  }

  updatePaginatedTodos() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTodos = this.filteredTodos.slice(start, end);
  }
}