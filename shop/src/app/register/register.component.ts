import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMsg: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  }
 
  // Client side validation
  onSubmit() {
    this.errorMsg = '';

    // Email validation
    if (!this.validateEmail(this.email)) {
      this.errorMsg = 'Invalid email address';
      return;
    }

    // Password validation
    if (!this.validatePassword(this.password)) {
      this.errorMsg = 'Password must be at least 6 characters and also contain 1 capital letter';
      return;
    }

    // Confirm password check
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }

    this.http.post(`${environment.apiUrl}/api/register`, { 
      email: this.email, 
      password: this.password, 
      confirmPassword: this.confirmPassword 
    })
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMsg = error.error?.message || error.message || 'Error registering user!';
        }
      });
  }
}
