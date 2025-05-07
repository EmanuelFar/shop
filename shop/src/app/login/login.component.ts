import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Please fill in all fields';
      return;
    }

    this.http.post(`${environment.apiUrl}/api/login`, { 
      email: this.email, 
      password: this.password 
    })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('userEmail', this.email);
          this.router.navigate(['/shop']);
        },
        error: (error) => {
          this.errorMsg = error.error?.message || 'Login failed';
        }
      });
  }
}
