// import { HTTP_INTERCEPTORS, HttpClientModule, ɵHttpInterceptorHandler } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { AuthService } from '../app/service/auth.service';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { StudentService } from './service/student.service';
// // import { EnumsService } from './service/enums.service';


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     RouterOutlet,
//     HttpClientModule,
//     NgSelectModule,
//     NgbModule
//   ],
//   providers: [AuthService, StudentService],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
// })
// export class AppComponent {
//   title = 'student-crud-app';
// }


import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { NgSelectModule } from '@ng-select/ng-select';
// import { StudentService } from './service/student.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    NgSelectModule,
    NgbModule
  ],
  providers: [AuthService, AuthGuard],
  // , StudentService
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'student-crud-app';
}