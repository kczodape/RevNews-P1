import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private isAuthenticated: boolean = false;
  private user: any;

  constructor() { }

  setUser(user: any):void{
    this.user = user;
  }

  getUser(): any{
    return this.user;
  }

  clearUser(): void{
    this.user = null;
  }

  login():void{
    this.isAuthenticated = true;
  }

  logout(): boolean {
    return this.isAuthenticated;
  }

  get isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
