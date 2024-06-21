// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

// // interface LoginResponse {
// //   token: string;
// // }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseUrl = 'http://localhost:3000/auth';

//   constructor(private http: HttpClient) { }

//   login(email: string, password: string): Observable<LoginResponse> {
//     const payload = { email, password };
//     return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload)
//       .pipe(
//         tap(response => {
//           // if (response && response.token) {
//           //   localStorage.setItem('token', response.token);
//           // }
//         }),
//         catchError(this.handleError)
//       );
//   }

//   register(username: string, email: string, password: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/signup`, { username, email, password })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   private handleError(error: HttpErrorResponse) {
//     console.error('AuthService handleError:', error);
//     return throwError(error);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password })
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, { username, email, password })
     
  }

  // private handleError(error: HttpErrorResponse) {
  //   return throwError(error);
  // }
}

