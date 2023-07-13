import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, FormsModule],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize email and password to empty strings', () => {
    expect(component.email).toEqual('');
    expect(component.password).toEqual('');
  });

  it('should display error message when email or password is not provided', () => {
    component.email = '';
    component.password = '';
    component.login();

    expect(component.alertMessage).toBeTruthy();
    expect(component.alertMessage).toContain('Please enter both email and password.');
  });

  it('should call the login method when the form is submitted', () => {
    spyOn(component, 'login');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.login).toHaveBeenCalled();
  });

  it('should toggle password visibility when the eye icon is clicked', () => {
    component.isPasswordVisible = false;
    const eyeIcon = fixture.nativeElement.querySelector('#togglePassword');
    eyeIcon.click();
    fixture.detectChanges();

    expect(component.isPasswordVisible).toBe(true);
  });
});
