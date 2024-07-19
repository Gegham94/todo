import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;

  constructor() {
    const currentUser = JSON.parse(
      sessionStorage.getItem('currentUser') || 'null'
    );
    this.currentUserSubject = new BehaviorSubject<any>(currentUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  register(
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    if (email && password && confirmPassword) {
      const newUser = { email, password };
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((user: any) => user.email === newUser.email)) {
        return of({ success: false, user: null, msg: 'User already exists' });
      }
      if (password !== confirmPassword) {
        return of({
          success: false,
          user: null,
          msg: 'Passwords do not match',
        });
      }
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      sessionStorage.setItem('currentUser', JSON.stringify(newUser));
      this.currentUserSubject.next(newUser);
      return of({ success: true, user: newUser, msg: '' });
    } else {
      return of({ success: false, user: null, msg: 'Incorrect Fields' });
    }
  }

  login(email: string, password: string): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (user: any) => user.email === email && user.password === password
    );
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of({ success: true, user: user, msg: '' });
    }
    return of({
      success: false,
      user: null,
      msg: 'Incorrect Email or Password',
    });
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser$;
  }
}
