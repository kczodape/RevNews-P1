import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private selectedCountrySubject = new BehaviorSubject<string>('us');
  private selectedCategorySubject = new BehaviorSubject<string>('general');

  selectedCountry$ = this.selectedCountrySubject.asObservable();
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  setSelectedCountry(country: string) {
    this.selectedCountrySubject.next(country);
  }

  setSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category);
  }
}