import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import {RegisterComponent} from './components/register/register.component'
import {StudentListComponent} from './components/student-list/student-list.component'
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register' , component: RegisterComponent},
    {path:'student',component:StudentListComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

