import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from 'src/models/login/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(data: Login): Observable<any> {
    return this.http.post(`${environment.backendServer.url}users/login`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.backendServer.url}users/logout`, {});
  }
}
