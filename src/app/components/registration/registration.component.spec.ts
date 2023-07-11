import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ReactiveFormsModule } from '@angular/forms';


describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, HttpClientTestingModule, ReactiveFormsModule], // Import ApolloTestingModule here
      declarations: [ RegistrationComponent ],
      providers: [GeolocationService] // Add any other required providers

    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
