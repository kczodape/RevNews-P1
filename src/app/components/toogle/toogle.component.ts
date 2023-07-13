import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-toogle',
  templateUrl: './toogle.component.html',
  styleUrls: ['./toogle.component.scss']
})
export class ToogleComponent implements OnInit  {
  isThemeDark!: Observable<boolean>;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isThemeDark = this.themeService.isThemeDark;
    this.setThemeColor();
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    this.setThemeColor();
  }

  private setThemeColor() {
    const isThemeDark = localStorage.getItem('dark') === 'true';
    if (isThemeDark) {
      document.documentElement.style.setProperty('--white-color', '#141313');
      document.documentElement.style.setProperty('--black-color', '#ffffff');
    } else {
      document.documentElement.style.setProperty('--white-color', '#ffffff');
      document.documentElement.style.setProperty('--black-color', '#141313');
    }
  }
}
