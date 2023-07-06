import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {}

  canActivate(): boolean {
    if (this.sessionService.isLoggedIn) {
      return true; // Allow access to the route if the user is logged in
    } else {
      this.router.navigateByUrl('/login'); // Redirect to the login page if the user is not logged in
      return false;
    }
  }
}
