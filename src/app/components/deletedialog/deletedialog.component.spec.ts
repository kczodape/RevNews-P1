import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { DeletedialogComponent } from './deletedialog.component';
import { SessionService } from 'src/app/services/session.service';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { DELETE_USER } from 'src/app/gql/usersDelete';

describe('DeletedialogComponent', () => {
  let component: DeletedialogComponent;
  let fixture: ComponentFixture<DeletedialogComponent>;
  let sessionService: SessionService;
  let apollo: Apollo;
  let router: Router;
  let dialogRefMock: MatDialogRef<DeletedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      declarations: [DeletedialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close')
          }
        },
        SessionService,
        Apollo,
        Router,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedialogComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService);
    apollo = TestBed.inject(Apollo);
    router = TestBed.inject(Router);
    dialogRefMock = TestBed.inject(MatDialogRef);
    fixture.detectChanges();

    // Set up a mock user for testing
    sessionService.setUser({ id: '12345' });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should close the dialog when clicking the "No" button', () => {
    const noButton = fixture.nativeElement.querySelector('button[mat-dialog-close]');
    noButton.click();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
