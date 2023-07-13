import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { ToogleComponent } from '../toogle/toogle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, FormsModule, MatSlideToggleModule],
      declarations: [LoginComponent, ToogleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
