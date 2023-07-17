import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexComponent } from './index.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArticlesComponent } from '../articles/articles.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToogleComponent } from '../toogle/toogle.component';
import { FooterComponent } from '../footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatPaginatorModule,
        FormsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatDatepickerModule, 
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule
      ],
      declarations: [
        FooterComponent,
        IndexComponent,
        NavbarComponent,
        ArticlesComponent,
        ToogleComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
