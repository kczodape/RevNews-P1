import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingComponent } from './landing.component';
import { Router } from '@angular/router';
describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should render the component with correct HTML structure', () => {
    const compiled = fixture.nativeElement;
    const logoElement = compiled.querySelector('.logo');
    const h1Element = logoElement.querySelector('h1');
    const routerLinkElement = h1Element.querySelector('a');
    const buttons = compiled.querySelectorAll('.btns button');
    const pElements = compiled.querySelectorAll('p');
    const buttonElement = compiled.querySelector('button');
  
    expect(logoElement).toBeTruthy();
    expect(h1Element).toBeTruthy();
    expect(routerLinkElement).toBeTruthy();
    expect(routerLinkElement.getAttribute('routerLink')).toBe('/login');
    expect(buttons.length).toBe(2);
    expect(pElements.length).toBe(2);
    expect(buttonElement.getAttribute('routerLink')).toBe('/login');
  });
  it('should navigate to login page when Login button is clicked', () => {
    const buttonElement = fixture.nativeElement.querySelector('.btns .button.login');
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
  
    buttonElement.click();
  
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
  
  it('should navigate to registration page when Sign Up button is clicked', () => {
    const buttonElement = fixture.nativeElement.querySelector('.btns .signup');
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
  
    buttonElement.click();
  
    expect(router.navigateByUrl).toHaveBeenCalledWith('/registration');
  });
  
  // Write your test cases here
});
