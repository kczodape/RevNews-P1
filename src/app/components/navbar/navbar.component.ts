import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { ArticleService } from 'src/app/services/article.service';
import { SearchService } from 'src/app/services/search.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
  user: any;
  countries: any[] = [];
  categories: any[] = [];
  selectedCountry: 'us' | any;
  selectedCategory: 'general' | any;
  searchKeyword: string = '';
  public searchQuery: string = '';

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private articleService: ArticleService,
    private searchService: SearchService
  ) {
    this.user = this.sessionService.getUser();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart | any) => {
        if (
          event.navigationTrigger === 'popstate' &&
          !this.sessionService.isLoggedIn &&
          this.router.url !== '/login'
        ) {
          this.router.navigateByUrl('/login');
        }
      });
    this.fetchCountries();
    this.fetchCategories();
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigateByUrl('/login');
    window.location.reload();
  }
  fetchCountries() {
    this.articleService.getCountries().subscribe((data: any) => {
      const uniqueCountries = [
        ...new Set(data.sources.map((source: any) => source.country)),
      ];
      this.countries = uniqueCountries.filter((country) => country);
      this.selectedCountry = null;
    });
  }

  fetchCategories() {
    this.articleService.getCategories().subscribe((data: any) => {
      const uniqueCategories = [
        ...new Set(data.sources.map((source: any) => source.category)),
      ];
      this.categories = uniqueCategories.filter((category) => category);
      this.selectedCategory = null;
    });
  }

  onCountryChange() {
    console.log('Selected Country:', this.selectedCountry);
    this.articleService.setSelectedCountry(this.selectedCountry);
  }

  onCategoryChange() {
    console.log('Selected Category:', this.selectedCategory);
    this.articleService.setSelectedCategory(this.selectedCategory);
  }
  filterArticles() {
    this.searchService.setSearchKeyword(this.searchKeyword);
  }
  public performSearch() {
    this.searchService.setSearchKeyword(this.searchQuery);
  }
}
