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
  // private apiKey = '';
  // private apiKey = '4179b0aaa9b243f6a2cae4686a986c39';
  // private apiKey = 'bbf4d1c813f544f591a622ec2b758a9f';
  private apiKey = 'd6d78a72ad8e4504a0d049ca6f63b8a8';
  // private apiKey = 'd6f7f658c7ad4a87a9d21757a90e803c';
  private apiUrl = 'https://newsapi.org/v2';
  private apiUrlEverything = 'https://newsapi.org/v2/everything';
  private apiUrlArticle = 'http://localhost:3002/articles';

  private selectedCountrySubject = new BehaviorSubject<string>('us');
  private selectedCategorySubject = new BehaviorSubject<string>('general');
  private selectedDateSubject = new BehaviorSubject<Date | null>(null);

  selectedCountry$ = this.selectedCountrySubject.asObservable();
  selectedCategory$ = this.selectedCategorySubject.asObservable();
  selectedDate$ = this.selectedDateSubject.asObservable() ;

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

  setSelectedDate(date: Date | null) {
    this.selectedDateSubject.next(date);
  }

  getCountries(): Observable<any> {
    const url = `${this.apiUrl}/sources?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getCategories(): Observable<any> {
    const url = `${this.apiUrl}/sources?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  private formatDate(date: string): string {
    const selectedDate = new Date(date);
    const year = String(selectedDate.getFullYear());
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // getArticlesByDate(selectedDate: string): Observable<any> {
  //   const formattedDate = this.formatDate(selectedDate);
  //   console.log(`formated date ${formattedDate}`);
  //   // const apiUrl = `${this.apiUrl}/everything?q=*&from=${formattedDate}&to=2023-07-14&sortBy=popularity&apiKey=${this.apiKey}`;
  //   const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2023-07-6&to=2023-07-14&sortBy=popularity&apiKey=d6f7f658c7ad4a87a9d21757a90e803c`;

  //   // https://newsapi.org/v2/everything?q=apple&from=2023-07-6&to=2023-07-14&sortBy=popularity&apiKey=d6f7f658c7ad4a87a9d21757a90e803c
  //   return this.http.get(apiUrl);
  // }

  getArticles(country: string, category: string): Observable<any> {
    const url = `${this.apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getEverything(date: string): Observable<any> {
    console.log("getEverything date"+date);
    
    const url = `${this.apiUrlEverything}?q=*&from=${date}&sortBy=popularity&apiKey=${this.apiKey}`;
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
