import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUser | null>;
  public currentUser$: Observable<IUser | null>;

  constructor() {
    const currentUser = JSON.parse(
      sessionStorage.getItem('currentUser') || 'null'
    );
    this.currentUserSubject = new BehaviorSubject<IUser | null>(currentUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  register(
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<{success: boolean, user:IUser | null, msg:string}> {
    if (email && password && confirmPassword) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((user: IUser) => user.email === email)) {
        return of({ success: false, user: null, msg: 'User already exists' });
      }
      if (password !== confirmPassword) {
        return of({
          success: false,
          user: null,
          msg: 'Passwords do not match',
        });
      }
      const newUser = { id: users.length, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      sessionStorage.setItem('currentUser', JSON.stringify(newUser));
      this.currentUserSubject.next(newUser);
      return of({ success: true, user: newUser, msg: '' });
    } else {
      return of({ success: false, user: null, msg: 'Incorrect Fields' });
    }
  }

  login(email: string, password: string): Observable<{success: boolean, user:IUser | null, msg:string}> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (user: IUser) => user.email === email && user.password === password
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

  getCurrentUser(): Observable<IUser | null> {
    return this.currentUser$;
  }

  getCurrentUserSync(): IUser | null {
    return this.currentUserSubject.value;
  }
}