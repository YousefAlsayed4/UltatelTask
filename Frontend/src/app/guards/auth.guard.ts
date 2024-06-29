// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
// } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     if (localStorage.getItem('token') !== null) {
//       if (
//         state.url.includes('login') ||
//         state.url.includes('register') ||
//         state.url.includes('email-confirmed')
//       ) {
//         this.router.navigate(['/student']);
//         return false;
//       }
//       return true;
//     } else {
//       if (state.url.includes('student')) {
//         this.router.navigate(['/login']);
//         return false;
//       }
//       return true;
//     }
//   }
// }



import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    console.log('AuthGuard: token =', token);
    const isLoginOrRegister = state.url.includes('login') || state.url.includes('register');
    const isAuthenticated = token !== null;
    console.log('AuthGuard: isAuthenticated =', isAuthenticated); 

    if (isAuthenticated) {
      if (isLoginOrRegister) {
        this.router.navigate(['/student']);
        return false;
      }
      return true;
    } else {
      if (state.url.includes('student')) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }
}
