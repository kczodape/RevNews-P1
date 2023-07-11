import { TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ResetPasswordService } from './reset-password.service';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [ResetPasswordService],
    });
    service = TestBed.inject(ResetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
