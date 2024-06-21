import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginErrorMessage: string = '';
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  showAnchorTag: boolean = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        if (error.error.message === 'Email not confirmed') {
          this.emailErrorMessage = 'Email not confirmed';
        } else if (error.error.message === "Email doesn't exist") {
          this.emailErrorMessage = `Email doesn't exist`;
          this.showAnchorTag = true;
        } else if (error.error.message === 'Wrong Password') {
          this.passwordErrorMessage = 'Wrong Password';
        } else {
          this.loginErrorMessage = 'An error occurred. Please try again later.';
        }
      }
    });
  }
}
