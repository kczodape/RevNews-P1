import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private http: HttpClient) {}
  // https://ipapi.co/json/
  getLocation() {
    return this.http.get('https://ipapi.co/json/');
  }
}
