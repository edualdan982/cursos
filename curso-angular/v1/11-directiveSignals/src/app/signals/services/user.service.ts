import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://reqres.in';

  constructor() {}
  private http: HttpClient = inject(HttpClient);

  getUserById(id: number): Observable<User> {
    return this.http
      .get<SingleUserResponse>(`${this.baseUrl}/api/users/${id}`)
      .pipe(
        map((response) => response.data),
        tap(console.log)
      );
  }

  getUsers(page: number): Observable<SingleUserResponse> {
    return this.http.get<SingleUserResponse>(
      `${this.baseUrl}/api/users?page=${page}`
    );
  }
}
