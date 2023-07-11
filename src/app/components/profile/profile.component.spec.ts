import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog  } from '@angular/material/dialog';
import { ProfileComponent } from './profile.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule, MatToolbarModule, MatIconModule, MatMenuModule, FormsModule],
      declarations: [ProfileComponent, NavbarComponent],
      providers: [MatDialog], 

    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
