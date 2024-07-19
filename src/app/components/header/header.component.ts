import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthComponent } from '../auth/auth.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule, AuthComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public currentUser$: Observable<any>;
  visible: boolean = false;
  showLogout: boolean = false;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  showDialog(prop: boolean) {
    if (!prop) {
      this.currentUser$ = this.authService.getCurrentUser();
    }
    this.visible = prop;
  }

  toggleLogout() {
    this.showLogout = !this.showLogout;
  }

  logout() {
    this.authService.logout();
    this.showLogout = false;
  }
}
