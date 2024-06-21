// // import { RouterModule, Routes } from '@angular/router';
// // import {LoginComponent} from './components/login/login.component'
// // import {RegisterComponent} from './components/register/register.component'
// // import {StudentListComponent} from './components/student-list/student-list.component'
// // import { NgModule } from '@angular/core';

// // export const routes: Routes = [
// //     { path: 'login', component: LoginComponent},
// //     { path: 'register' , component: RegisterComponent},
// //     {path:'student',component:StudentListComponent},
// //     { path: '', redirectTo: '/login', pathMatch: 'full' },
// //     { path: '**', redirectTo: '/login', pathMatch: 'full' }
// // ];
// // @NgModule({
// //   imports: [RouterModule.forRoot(routes)],
// //   exports: [RouterModule]
// // })
// // export class AppRoutingModule { }

// import { Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// // import { EmailConfirmedComponent } from './components/email-confirmed/email-confirmed.component';
// import { RegisterComponent } from './components/register/register.component';
//  import {StudentComponent} from './components/student-list/student-list.component'
// // import { AuthGuard } from '../guards/auth.guard';
// // import { DeactivateGuard } from '../guards/deactivate.guard';

// export const routes: Routes = [
//   {
//     path: 'register',
//     component: RegisterComponent,
//     // canActivate: [DeactivateGuard],
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//     // canActivate: [DeactivateGuard],
//   },
//   {path:'student',component:StudentComponent},
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: '**', redirectTo: 'login' },
// ];



import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
// import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
// import { EmailConfirmedComponent } from './components/email-confirmed/email-confirmed.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'email-confirmed/:token', component: EmailConfirmedComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];