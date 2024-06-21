import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../Service/login.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token=localStorage.getItem("token");
    if(token)
    {
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer `+token)
    });
    return next.handle(authReq)
  }
    return next.handle(request);
  }
}
