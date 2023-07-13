import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { ResetdialogComponent } from './resetdialog.component';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('ResetdialogComponent', () => {
  let component: ResetdialogComponent;
  let fixture: ComponentFixture<ResetdialogComponent>;
  let resetPasswordService: ResetPasswordService;
  let router: Router;
  let resetPasswordSpy: jasmine.Spy;
  let navigateByUrlSpy: jasmine.Spy;
  let resetFormResetSpy: jasmine.Spy;
  let dialogRefCloseSpy: jasmine.Spy;
  let apolloController: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ApolloTestingModule],
      declarations: [ResetdialogComponent],
      providers: [
        ResetPasswordService,
        { provide: MatDialogRef, useValue: { close: dialogRefCloseSpy } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl').and.returnValue(Promise.resolve(true)) } },
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(ResetdialogComponent);
    component = fixture.componentInstance;
  
    // Inject the services
    resetPasswordService = TestBed.inject(ResetPasswordService);
    router = TestBed.inject(Router);
    apolloController = TestBed.inject(ApolloTestingController);
  
    // Update the spyOn statements here
    resetPasswordSpy = spyOn(resetPasswordService, 'resetPassword').and.returnValue(of({}));
  
    fixture.detectChanges();
  });
  
  
  
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should reset the password when the passwords match', fakeAsync(() => {
  //   // Set up test data
  //   component.user = { id: '1', password: 'oldPassword123' };
  //   component.dbPassword = component.user.password;
  //   component.newPassword = 'newPassword123';

  //   // Call the reset method
  //   component.reset();
  //   tick();

  //   // Expectations
  //   expect(resetPasswordSpy).toHaveBeenCalledWith(
  //     component.user.id,
  //     component.newPassword
  //   );
  //   expect(navigateByUrlSpy).toHaveBeenCalledWith('/index');
  //   expect(resetFormResetSpy).toHaveBeenCalled();
  //   expect(dialogRefCloseSpy).toHaveBeenCalled();
  // }));
  // afterEach(() => {
  //   fixture.destroy();
  //   apolloController.verify();
  // });
});
