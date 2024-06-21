import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
          switch (error.status) {
            case 401:
              errorMessage = 'Unauthorized access - maybe you need to log in?';
              this.router.navigate(['/login']);
              break;
            case 403:
              errorMessage = 'Forbidden - you don\'t have permission to access this resource.';
              break;
            case 404:
              errorMessage = 'Resource not found.';
              break;
              case 409:
              errorMessage = 'Conflicts - user name or email already exist';
              break;
            case 500:
              errorMessage = 'Internal server error - please try again later.';
              break;
            default:
              errorMessage = 'An unexpected error occurred.';
          }
        }

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage
          });

        return throwError(errorMessage);
      })
    );
  }
}