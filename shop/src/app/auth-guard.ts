import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


/*
  This is a simple auth guard that checks if the user is logged in by checking if the userEmail is in the local storage.
  If the user is not logged in, the user will be redirected to the login page.
  If the user is logged in, the user will be redirected to the shop page.
*/
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private http: HttpClient, private router: Router) {}

  canActivate(): Promise<boolean> {
    return this.checkAuth();
  }

  canActivateChild(): Promise<boolean> {
    return this.checkAuth();
  }

  private checkAuth(): Promise<boolean> {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      this.router.navigate(['/login']);
      return Promise.resolve(false);
    }

    // Use POST and send email in the body
    return this.http.post(`${environment.apiUrl}/api/validate`, { email: userEmail })
      .toPromise()
      .then(
        (response: any) => {
          if (response.valid) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        },
        () => {
          this.router.navigate(['/login']);
          return false;
        }
      );
  }
}