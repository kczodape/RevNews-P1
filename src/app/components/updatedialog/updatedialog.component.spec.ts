import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UpdatedialogComponent } from './updatedialog.component';
import { Apollo } from 'apollo-angular'; // Import Apollo service
import { ApolloTestingModule } from 'apollo-angular/testing'; // Import ApolloTestingModule
import { FormsModule } from '@angular/forms'; // Import FormsModule


describe('UpdatedialogComponent', () => {
  let component: UpdatedialogComponent;
  let fixture: ComponentFixture<UpdatedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ApolloTestingModule, // Add ApolloTestingModule
        FormsModule, // Add FormsModule
      ],
      declarations: [UpdatedialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        Apollo, // Add Apollo service provider
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
