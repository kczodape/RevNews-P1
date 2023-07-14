import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { SearchService } from 'src/app/services/search.service';
import * as moment from 'moment';
import { NewsService } from 'src/app/services/news.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

declare var google: any; // Declare the 'google' variable

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  public articles: any[] = [];
  public filteredArticles: any[] = [];
  public searchKeyword: string = '';
  public keyword: any[] = [];
  public searchQuery: string = '';
  public category: string = '';
  public country: string | any;

  public selectedDate: Date | any;
  public currentPage: number = 0;
  public pageSize: number = 5;
  public totalItems: number = 0;

  constructor(
    private articleService: ArticleService,
    private searchService: SearchService
  ) {}

  // onDateSelected() {
  //   if (this.selectedDate) {
  //     this.articleService.getArticlesByDate(this.selectedDate).subscribe((data: any)=> {
  //       this.articles = data.articles;
  //       console.log('Fetched Articles:', this.articles);
  //     })
  //   }
  // }

  ngOnInit() {
    // this.googleTranslateElementInit();
    this.articleService.selectedCountry$.subscribe((selectedCountry) => {
      this.country = selectedCountry;
      this.fetchArticles(
        selectedCountry,
        this.articleService.getSelectedCategory()
      );
    });

    this.articleService.selectedCategory$.subscribe((selectedCategory) => {
      this.category = selectedCategory;
      this.fetchArticles(
        this.articleService.getSelectedCountry(),
        selectedCategory
      );
    });

    this.articleService
      .getArticles(
        this.articleService.getSelectedCountry(),
        this.articleService.getSelectedCategory()
      )
      .subscribe((data: any) => {
        this.articles = data.articles;
        this.filterArticles();
      });

    this.searchService.getSearchKeyword().subscribe((keyword) => {
      this.searchKeyword = keyword;
      this.filterArticles();
    });

    // Subscribe to selectedDate changes
    this.articleService.selectedDate$.subscribe((selectedDate) => {
      this.selectedDate = selectedDate;
      this.onDateSelected();
    });

    this.filterArticles();
  }

  fetchArticles(country: string, category: string) {
    this.articleService
      .getArticles(country, category)
      .subscribe((data: any) => {
        this.articles = data.articles;
        this.filterArticles();
      });
  }

  filterArticles() {
    if (this.searchKeyword) {
      this.filteredArticles = this.articles.filter((article) =>
        article.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      this.filteredArticles = this.articles;
    }

    this.totalItems = this.filteredArticles.length;
  }

  getPaginatedArticles(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredArticles.slice(startIndex, startIndex + this.pageSize);
  }

  formatDate(dateString: string): string {
    const dateObj = moment(dateString);
    if (dateObj.isValid()) {
      return dateObj.format('YYYY-MM-DD'); // Customize the format as per your requirements
    } else {
      return 'Invalid Date';
    }
  }

  public performSearch(): void {
    // Filter the articles based on the search query
    this.filteredArticles = this.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        article.date.toISOString().includes(this.searchQuery) ||
        article.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 0;
    this.totalItems = this.filteredArticles.length;
  }

  public truncateTitle(title: string, limit: number): string {
    if (!title || title.length < 7) {
      return '';
    }

    const words = title.trim().split(/\s+/);
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return title;
    }
  }
  public truncateDescription(description: string, limit: number): string {
    const defaultDescription = 'No description available.';

    if (!description || description.length < 12) {
      return defaultDescription;
    }

    const words = description.trim().split(/\s+/);
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return description;
    }
  }

  public onPageChanged(page: number): void {
    this.currentPage = page;
  }

  onDateSelected(): void {
    if (this.selectedDate) {
      const formattedDate = moment(this.selectedDate).format('YYYY-MM-DD');
      this.articleService
        .getEverything(formattedDate)
        .subscribe((data: any) => {
          this.articles = data.articles;
          this.filterArticles();
        });
    }
    console.log(this.selectedDate);
  }

  public googleTranslateElementInit() {
    new google.translate.TranslateElement(
      { pageLanguage: 'en' },
      'google_translate_element'
    );
  }
  saveArticle(article: any): void {
    this.articleService.saveArticle(article);
    console.log('Article saved successfully!');
  }
}
