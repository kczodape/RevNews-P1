import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = '4179b0aaa9b243f6a2cae4686a986c39';
  private apiUrl = `https://newsapi.org/v2`;
  constructor(private http: HttpClient) {}

  getCountries() {
    const url = `${this.apiUrl}/countries?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getCategories() {
    const url = `${this.apiUrl}/categories?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getArticles(country: string, category: string) {
    const url = `${this.apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
