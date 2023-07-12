import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import * as moment from 'moment';
@Component({
  selector: 'app-saved-articles',
  templateUrl: './saved-articles.component.html',
  styleUrls: ['./saved-articles.component.scss'],
})
export class SavedArticlesComponent implements OnInit {
  savedArticles: any[] = [];
  userEmail: string | null = sessionStorage.getItem('email');

  constructor(
    private articleService: ArticleService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.userEmail) {
      this.articleService.getSavedArticles(this.userEmail).subscribe(
        (data: any) => {
          console.log('Retrieved articles:', data); // Check if articles are retrieved correctly
          this.savedArticles = data;
        },
        (error) => {
          console.error('Failed to retrieve saved articles:', error);
        }
      );
    } else {
      console.log('User email not found in sessionStorage');
    }
  }
  formatDate(dateString: string): string {
    const dateObj = moment(dateString);
    if (dateObj.isValid()) {
      return dateObj.format('YYYY-MM-DD'); // Customize the format as per your requirements
    } else {
      return 'Invalid Date';
    }
  }
  public truncateTitle(title: string, limit: number): string {
    const words = title.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return title;
    }
  }

  public truncateDescription(description: string, limit: number): string {
    const words = description.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return description;
    }
  }

  deleteArticle(articleId: number): void {
    this.articleService.deleteArticle(articleId).subscribe(
      () => {
        // Remove the deleted article from the savedArticles array
        this.savedArticles = this.savedArticles.filter(
          (article) => article.id !== articleId
        );
      },
      (error) => {
        console.error('Failed to delete article:', error);
      }
    );
  }
}
