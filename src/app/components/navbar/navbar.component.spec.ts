import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NavbarComponent } from './navbar.component';
import { SessionService } from 'src/app/services/session.service';
import { ArticleService } from 'src/app/services/article.service';
import { SearchService } from 'src/app/services/search.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        SessionService,
        ArticleService,
        SearchService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch countries on component initialization', () => {
    spyOn(component, 'fetchCountries').and.callThrough();
    component.ngOnInit();
    expect(component.fetchCountries).toHaveBeenCalled();
    expect(component.countries.length).toBeGreaterThan(0);
  });

  it('should fetch categories on component initialization', () => {
    spyOn(component, 'fetchCategories').and.callThrough();
    component.ngOnInit();
    expect(component.fetchCategories).toHaveBeenCalled();
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should set selected country on country change', () => {
    const selectedCountry = 'us';
    component.onCountryChange();
    expect(component.selectedCountry).toBe(selectedCountry);
    expect(component.articleService.setSelectedCountry).toHaveBeenCalledWith(selectedCountry);
  });

  it('should set selected category on category change', () => {
    const selectedCategory = 'general';
    component.onCategoryChange();
    expect(component.selectedCategory).toBe(selectedCategory);
    expect(component.articleService.setSelectedCategory).toHaveBeenCalledWith(selectedCategory);
  });

  it('should set search keyword on filter articles', () => {
    const searchKeyword = 'example';
    component.searchKeyword = searchKeyword;
    component.filterArticles();
    expect(component.searchService.setSearchKeyword).toHaveBeenCalledWith(searchKeyword);
  });

  it('should set search keyword on perform search', () => {
    const searchQuery = 'example';
    component.searchQuery = searchQuery;
    component.performSearch();
    expect(component.searchService.setSearchKeyword).toHaveBeenCalledWith(searchQuery);
  });

  it('should call sessionService logout and reload on logout', () => {
    spyOn(component.sessionService, 'logout').and.callThrough();
    spyOn(window.location, 'reload');
    component.logout();
    expect(component.sessionService.logout).toHaveBeenCalled();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/login');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
