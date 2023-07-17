import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, MatToolbarModule, MatIconModule, MatMenuModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, BrowserAnimationsModule], // Import HttpClientModule here
      declarations: [ NavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set search keyword on filter articles', () => {
    const searchKeyword = 'example';
    spyOn(component.searchService, 'setSearchKeyword').and.returnValue(); // spyOn searchService method
    component.searchKeyword = searchKeyword;
    component.filterArticles();
    expect(component.searchService.setSearchKeyword).toHaveBeenCalledWith(searchKeyword);
  });
  
  it('should set search keyword on perform search', () => {
    const searchQuery = 'example';
    spyOn(component.searchService, 'setSearchKeyword').and.returnValue(); // spyOn searchService method
    component.searchQuery = searchQuery;
    component.performSearch();
    expect(component.searchService.setSearchKeyword).toHaveBeenCalledWith(searchQuery);
  });
    it('should fetch countries and update the component properties', () => {
      // Mock data to simulate the response from the service
      const mockData = {
        sources: [
          { country: 'us' },
          { country: 'uk' },
          { country: 'us' },
          { country: null },
        ],
      };
  
      // Create a spy object for the getCountries method of ArticleService
      spyOn(component.articleService, 'getCountries').and.returnValue(of(mockData));
  
      // Call the fetchCountries method
      component.fetchCountries();
  
      // Expectations
      expect(component.articleService.getCountries).toHaveBeenCalled();
      expect(component.countries).toEqual(['us', 'uk']);
      expect(component.selectedCountry).toBeNull();
    });
    it('should fetch categories and update the component properties', () => {
      // Mock data to simulate the response from the service
      const mockData = {
        sources: [
          { category: 'technology' },
          { category: 'science' },
          { category: 'technology' },
          { category: null },
        ],
      };
  
      // Create a spy object for the getCategories method of ArticleService
      spyOn(component.articleService, 'getCategories').and.returnValue(of(mockData));
  
      // Call the fetchCategories method
      component.fetchCategories();
  
      // Expectations
      expect(component.articleService.getCategories).toHaveBeenCalled();
      expect(component.categories).toEqual(['technology', 'science']);
      expect(component.selectedCategory).toBeNull();
    });
    
  });
