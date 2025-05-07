import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userEmail: string = localStorage.getItem('userEmail') || '';
  showMenu: boolean = false;
  userName: string = this.userEmail?.split('@')[0] || '';

  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    console.log('Logout clicked');
    localStorage.removeItem('userEmail');
    this.showMenu = false;
    this.router.navigate(['/login']);
  }
}
