import { TestBed } from '@angular/core/testing';
import { GeolocationService } from './geolocation.service';
import { HttpClientModule } from '@angular/common/http';


describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Import HttpClientModule here
      providers: [GeolocationService],
    });
    service = TestBed.inject(GeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
