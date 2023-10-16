import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { SearchService } from 'src/app/services/search.service';
import * as moment from 'moment';
import { NewsService } from 'src/app/services/news.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { SharepopupComponent } from '../sharepopup/sharepopup.component';
import { AuthGuard } from 'src/app/auth.guard';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation.service';

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
  isLoggedIn: boolean = false;

  public selectedDate: Date | any;
  public currentPage: number = 0;
  public pageSize: number = 5;
  public totalItems: number = 0;
  public maxDate: Date | any;
  geoLocation: any;
  public lowerCaseCountry: String | any;

  countries: { code: string; name: string }[] = [
    { code: 'us', name: 'United States' },
    { code: 'au', name: 'Australia' },
    { code: 'no', name: 'Norway' },
    { code: 'it', name: 'Italy' },
    { code: 'sa', name: 'Saudi Arabia' },
    { code: 'pk', name: 'Pakistan' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'de', name: 'Germany' },
    { code: 'br', name: 'Brazil' },
    { code: 'ca', name: 'Canada' },
    { code: 'es', name: 'Spain' },
    { code: 'ar', name: 'Argentina' },
    { code: 'fr', name: 'France' },
    { code: 'in', name: 'India' },
    { code: 'is', name: 'Iceland' },
    { code: 'ru', name: 'Russia' },
    { code: 'se', name: 'Sweden' },
    { code: 'za', name: 'South Africa' },
    { code: 'ie', name: 'Ireland' },
    { code: 'nl', name: 'Netherlands' },
    { code: 'zh', name: 'China' },
    // Add more countries as needed
  ];

  // ... (existing class properties and methods)

  // Function to get the full country name in capital letters
  public getFullCountryName(countryCode: string): string {
    const countryInfo = this.countries.find((country) => country.code === countryCode);
    return countryInfo ? countryInfo.name.toUpperCase() : '';
  }
  
  constructor(
    public articleService: ArticleService,
    public searchService: SearchService,
    public sessionService: SessionService,
    public dialog: MatDialog,
    public geoLocationService: GeolocationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.geoLocationService.getLocation().subscribe((response) => {
      console.log(response);
      this.geoLocation = response;
      this.lowerCaseCountry = this.geoLocation?.country.toLowerCase();
      sessionStorage.setItem('selectedCountry', this.lowerCaseCountry);
      this.articleService.setSelectedCountry(this.lowerCaseCountry);
    });
    this.isLoggedIn = this.sessionService.isLoggedIn;
    // Set the minimum date to today
    this.maxDate = new Date();
    this.maxDate.setHours(0, 0, 0, 0);
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
    this.articleService.getArticles(country, category)
      .subscribe((data: any) => {
        this.articles = data.articles;
        this.filterArticles(); // Update filteredArticles after fetching data
      });
  }
  

  filterArticles() {
     // Apply the filtering logic based on the search keyword
  if (this.searchKeyword) {
    this.filteredArticles = this.articles.filter((article) =>
      article.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  } else {
    this.filteredArticles = this.articles;
  }

  // Reset the current page to 0 when articles change or search keyword is updated
  this.currentPage = 0;

  // Update the totalItems with the new filtered articles
  this.totalItems = this.filteredArticles.length;
  }

  getPaginatedArticles(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredArticles.slice(startIndex, endIndex);
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
      const today = new Date(); // Get today's date
      today.setHours(0, 0, 0, 0); // Set the time to midnight

      // Disable future dates
      if (this.selectedDate.getTime() > today.getTime()) {
        this.selectedDate = null; // Reset the selected date
        return;
      }
      const formattedDate = moment(this.selectedDate).format('YYYY-MM-DD');
      console.log('formated' + formattedDate);
      this.articleService
        .getEverything(formattedDate)
        .subscribe((data: any) => {
          console.log(data);

          this.articles = data.articles;
          this.filterArticles();
        });
    }
    console.log(this.selectedDate);
  }

  // public googleTranslateElementInit() {
  //   new google.translate.TranslateElement(
  //     { pageLanguage: 'en' },
  //     'google_translate_element'
  //   );
  // }
  saveArticle(article: any): void {
    if (this.isLoggedIn) {
      this.articleService.saveArticle(article);
      console.log('Article saved successfully!');
    } else {
    this.router.navigateByUrl('/login');
    }
  }

  openSharePopup(url: string) {
    if (this.isLoggedIn) {
      const dialogRef = this.dialog.open(SharepopupComponent, {
        width: '600px',
        height: '350px',
        data: { articleUrl: url },
      });
    } else {
    this.router.navigateByUrl('/login');
    }
  }
}
