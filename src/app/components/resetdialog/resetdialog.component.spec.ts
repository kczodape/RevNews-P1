import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { ResetdialogComponent } from './resetdialog.component';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

describe('ResetdialogComponent', () => {
  let component: ResetdialogComponent;
  let fixture: ComponentFixture<ResetdialogComponent>;
  const MAT_MDC_DIALOG_DATA = new InjectionToken<any>('MatMdcDialogData');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, FormsModule],
      declarations: [ResetdialogComponent],
      providers: [
        ResetPasswordService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: MAT_MDC_DIALOG_DATA,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
