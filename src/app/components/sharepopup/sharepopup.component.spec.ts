import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';
import { SharepopupComponent } from './sharepopup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export const MAT_MDC_DIALOG_DATA = new InjectionToken<any>('MatMdcDialogData');

describe('SharepopupComponent', () => {
  let component: SharepopupComponent;
  let fixture: ComponentFixture<SharepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, MatIconModule],
      declarations: [SharepopupComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Provided for MAT_DIALOG_DATA
        // Provide the necessary dependencies
        { provide: MAT_MDC_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SharepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
