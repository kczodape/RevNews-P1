import { TestBed } from '@angular/core/testing';

import { GetemailsService } from './getemails.service';

describe('GetemailsService', () => {
  let service: GetemailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetemailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
