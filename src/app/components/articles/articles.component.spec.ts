import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { of, Subscription } from 'rxjs';

import { ArticlesComponent } from './articles.component';
import { ArticleService } from 'src/app/services/article.service';
import { SearchService } from 'src/app/services/search.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ToogleComponent } from '../toogle/toogle.component';
import { FooterComponent } from '../footer/footer.component';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let articleService: ArticleService;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSlideToggleModule,
        HttpClientTestingModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatDialogModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        MatInputModule
      ],
      declarations: [ArticlesComponent, ToogleComponent, FooterComponent],
      providers: [ArticleService, SearchService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    articleService = TestBed.inject(ArticleService);
    searchService = TestBed.inject(SearchService);

    spyOn(articleService.selectedCountry$, 'subscribe').and.callFake((callback: (value: string) => void) => {
      callback('US');
      return new Subscription();
    });

    spyOn(articleService.selectedCategory$, 'subscribe').and.callFake((callback: (value: string) => void) => {
      callback('technology');
      return new Subscription();
    });

    spyOn(articleService, 'getSelectedCountry').and.returnValue('US');
    spyOn(articleService, 'getSelectedCategory').and.returnValue('technology');

    spyOn(articleService, 'getArticles').and.returnValue(
      of({
        articles: [
          { title: 'Article 1', date: '2023-07-01', author: 'Author 1' },
          { title: 'Article 2', date: '2023-07-02', author: 'Author 2' }
        ]
      })
    );

    spyOn(searchService, 'getSearchKeyword').and.returnValue(of('keyword'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch articles on component initialization', () => {
  //   expect(articleService.getArticles).toHaveBeenCalledWith('US', 'technology');
  //   expect(component.articles.length).toBe(2);
  //   expect(component.filteredArticles.length).toBe(2);
  
  // });

  it('should filter articles based on search keyword', () => {
    component.searchKeyword = 'Article 1';
    component.filterArticles();
    expect(component.filteredArticles.length).toBe(1);
    expect(component.filteredArticles[0].title).toBe('Article 1');
  });

  it('should handle empty search keyword when filtering articles', () => {
    component.searchKeyword = '';
    component.filterArticles();
    expect(component.filteredArticles.length).toBe(2);
  });

  // it('should paginate articles', () => {
  //   const paginatedArticles = component.getPaginatedArticles();
  //   expect(paginatedArticles.length).toBe(2);
  // });

  it('should format the date', () => {
    const formattedDate = component.formatDate('2023-07-01');
    expect(formattedDate).toBe('2023-07-01');
  });

  it('should handle invalid date when formatting', () => {
    const formattedDate = component.formatDate('Invalid Date');
    expect(formattedDate).toBe('Invalid Date');
  });

  // it('should perform a search', () => {
  //   component.searchQuery = 'Article 1';
  //   component.performSearch();
  //   expect(component.filteredArticles.length).toBe(1);
  //   expect(component.filteredArticles[0].title).toBe('Article 1');
  // });

  it('should handle empty search query when performing a search', () => {
    component.searchQuery = '';
    component.performSearch();
    expect(component.filteredArticles.length).toBe(2);
  });

  it('should truncate the title', () => {
    const truncatedTitle = component.truncateTitle('This is a long title', 3);
    expect(truncatedTitle).toBe('This is a...');
  });

  it('should return empty string when title is empty or too short', () => {
    const truncatedTitle = component.truncateTitle('', 3);
    expect(truncatedTitle).toBe('');

    const truncatedTitleShort = component.truncateTitle('Short', 10);
    expect(truncatedTitleShort).toBe('');
  });

  // it('should truncate the description', () => {
  //   const truncatedDescription = component.truncateDescription(
  //     'This is a long description',
  //     5
  //   );
  //   expect(truncatedDescription).toBe('This is a long description...');
  // });

  it('should return default description when description is empty or too short', () => {
    const truncatedDescription = component.truncateDescription('', 5);
    expect(truncatedDescription).toBe('No description available.');

    const truncatedDescriptionShort = component.truncateDescription('Short', 10);
    expect(truncatedDescriptionShort).toBe('No description available.');
  });

  it('should change the current page', () => {
    component.onPageChanged(1);
    expect(component.currentPage).toBe(1);
  });

  // it('should save an article', () => {
  //   spyOn(articleService, 'saveArticle');
  //   component.saveArticle({ title: 'Article 1' });
  //   expect(articleService.saveArticle).toHaveBeenCalledWith({ title: 'Article 1' });
  //   expect(console.log).toHaveBeenCalledWith('Article saved successfully!');
  // });
});