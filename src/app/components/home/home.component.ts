import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TodoListComponent, HeaderComponent, FooterComponent, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public currentUser$: Observable<any>;
  public isFakeLoading = true;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.getCurrentUser();
    setTimeout(() => {
      this.isFakeLoading = false;
    }, 1000);
  }
}