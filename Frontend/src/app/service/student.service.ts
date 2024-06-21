  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
  import { Observable } from 'rxjs';
import { StudentPaginated } from '../dto/studentPaginated.dto';
  
  @Injectable({
    providedIn: 'root',
  })
  export class StudentService {
    private baseUrl =
      'http://localhost:3000/students';
  
    constructor(private http: HttpClient) {}
  
    getAllStudents(): Observable<any[]> {
      // const token = localStorage.getItem('token');
      // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.get<any[]>(`${this.baseUrl}`);
    }
    // , { headers }
  
    getStudentById(studentId: number): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.get<any>(`${this.baseUrl}/${studentId}`, { headers });
    }
  
    createStudent(studentData: any): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.post<any>(`${this.baseUrl}`, studentData, { headers });
    }
  
    updateStudent(studentId: number, studentData: any): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.patch<any>(`${this.baseUrl}/${studentId}`, studentData, {
        headers,
      });
    }
  
    deleteStudent(studentId: number): Observable<any> {
      // const token = localStorage.getItem('token');
      // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //{ headers }
      return this.http.delete<any>(`${this.baseUrl}/${studentId}`);
    }
    
  filterStudent(page: number, limit: number, filters: any): Observable<StudentPaginated> {
    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get<StudentPaginated>(this.baseUrl, { params });
  }
  }
 