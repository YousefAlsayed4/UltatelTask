import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.baseUrl}/student`, { headers });
  }

  getStudentById(studentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.baseUrl}/student/${studentId}`, { headers });
  }

  createStudent(studentData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${this.baseUrl}/student`, studentData, { headers });
  }

  updateStudent(studentId: number, studentData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<any>(`${this.baseUrl}/student/${studentId}`, studentData, {
      headers,
    });
  }

  deleteStudent(studentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(`${this.baseUrl}/student/${studentId}`, { headers });
  }
}
