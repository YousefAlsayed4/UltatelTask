import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  passwordStrength: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.patternValidator(/(?=.*[A-Z])/, { hasUpperCase: true }),
        this.patternValidator(/(?=.*[a-z])/, { hasLowerCase: true }),
        this.patternValidator(/(?=.*\d)/, { hasNumber: true }),
        this.patternValidator(/(?=.*[^\w\d\s:])/, { hasSpecialCharacter: true })
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.matchPasswords('password', 'confirmPassword')
    });

    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordStrength = this.evaluatePasswordStrength(value);
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const { username, email, password } = this.registerForm.value;
    this.authService.register(username, email, password).subscribe((data) => {
      console.log(data);
    });
  }

  patternValidator(regex: RegExp, error: { [key: string]: boolean }): (control: any) => any {
    return (control: any): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  evaluatePasswordStrength(password: string): string {
    if (!password) {
      return '';
    }

    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const hasNumber = /[0-9]+/.test(password);
    const hasSpecialCharacter = /[^\w\d\s:]+/.test(password);
    const length = password.length >= 8;

    const conditions = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialCharacter, length];

    const strength = conditions.filter(cond => cond).length;

    if (strength <= 2) {
      return 'Very Weak';
    } else if (strength === 3) {
      return 'Weak';
    } else if (strength === 4) {
      return 'Medium';
    } else if (strength === 5) {
      return 'Strong';
    } else {
      return '';
    }
  }

  getPasswordErrorMessage() {
    const errors = this.registerForm.get('password')?.errors;
    if (errors) {
      if (errors['required']) {
        return 'Password is required';
      } else if (errors['minlength']) {
        return 'Password must be at least 8 characters long';
      } else if (errors['hasUpperCase']) {
        return 'Password must contain at least one uppercase letter';
      } else if (errors['hasLowerCase']) {
        return 'Password must contain at least one lowercase letter';
      } else if (errors['hasNumber']) {
        return 'Password must contain at least one number';
      } else if (errors['hasSpecialCharacter']) {
        return 'Password must contain at least one special character';
      }
    }
    return '';
  }

  getConfirmPasswordErrorMessage() {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    if (confirmPasswordControl?.errors) {
      if (confirmPasswordControl.errors['required']) {
        return 'Confirm Password is required';
      } else if (confirmPasswordControl.errors['mustMatch']) {
        return 'Passwords do not match';
      }
    }
    return '';
  }
}
