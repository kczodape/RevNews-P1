import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  filterArticles() {
    throw new Error('Method not implemented.');
  }
  private apiKey = '';
  // private apiKey = '4179b0aaa9b243f6a2cae4686a986c39';
  // private apiKey = 'bbf4d1c813f544f591a622ec2b758a9f';
  // private apiKey = 'd6d78a72ad8e4504a0d049ca6f63b8a8';
  private apiUrl = 'https://newsapi.org/v2';
  private apiUrlArticle = 'http://localhost:3002/articles';
  private selectedCountrySubject = new BehaviorSubject<string>('us');
  private selectedCategorySubject = new BehaviorSubject<string>('general');

  selectedCountry$ = this.selectedCountrySubject.asObservable();
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  setSelectedCountry(country: string) {
    this.selectedCountrySubject.next(country);
  }

  getSelectedCountry(): string {
    const storedCountry = sessionStorage.getItem('selectedCountry');

    return storedCountry
      ? storedCountry.toLowerCase()
      : this.selectedCountrySubject.value;
  }

  setSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category);
  }

  getSelectedCategory(): string {
    return this.selectedCategorySubject.value;
  }

  getCountries(): Observable<any> {
    const url = `${this.apiUrl}/sources?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getCategories(): Observable<any> {
    const url = `${this.apiUrl}/sources?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getArticles(country: string, category: string) {
    const url = `${this.apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
  saveArticle(article: any): void {
    const userEmail = sessionStorage.getItem('email');
    const url = 'http://localhost:3002/articles';
    const updatedArticle = {
      email: userEmail,
      ...article,
    };
    this.http.post(url, updatedArticle).subscribe(
      () => {
        alert('Articles saved successfully');
      },
      (error) => {
        console.error('Failed to save article:', error);
      }
    );
    // this.savedArticles.push(article);
  }

  getSavedArticles(userEmail: string) {
    const url = `${this.apiUrlArticle}?email=${userEmail}`;
    return this.http.get(url);
  }
  deleteArticle(articleId: number): Observable<any> {
    const url = `http://localhost:3002/articles/${articleId}`;
    return this.http.delete(url);
  }
}
