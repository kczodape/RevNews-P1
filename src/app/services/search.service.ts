import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchKeyword: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  setSearchKeyword(keyword: string) {
    this.searchKeyword.next(keyword);
  }

  getSearchKeyword(): Observable<string> {
    return this.searchKeyword.asObservable();
  }
}
