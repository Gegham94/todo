import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  private authSubscribtion = new Subscription();
  public isLoginMode = true;

  public authForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['',[Validators.minLength(6), Validators.required]]
    });
  }

  login() {
    const { email, password } = this.authForm.value;
    this.authSubscribtion = this.authService.login(email, password).pipe(
      tap((data) => {
        if (data?.success) {
          this.visible = false;
          this.visibleChange.emit(false);
        } else {
          alert(data?.msg);
        }
      })
    ).subscribe();
  }

  register() {
    const { email, password, confirmPassword } = this.authForm.value;
    this.authSubscribtion = this.authService.register(email, password, confirmPassword).pipe(
      tap((data) => {
        if (data?.success) {
          this.visible = false;
          this.visibleChange.emit(false);
        } else {
          alert(data?.msg);
        }
      })
    ).subscribe();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.visible && !target.closest('.container')) {
      this.visible = false;
      this.visibleChange.emit(false);
      this.authForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.authSubscribtion.unsubscribe();
  }
}