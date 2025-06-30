import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new EventEmitter<{ username: string, role: string } | null>();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:3000/api/users/login', {
      username,
      password
    }).pipe(
      tap(res => {
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        this.user.emit({ username: payload.username, role: payload.role });
      })
    );
  }

  logout() {
    this.user.emit(null);
  }
}
