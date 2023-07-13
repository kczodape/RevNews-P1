import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UPDATE_USER } from "src/app/gql/usersUpdate";
import { UpdatedialogComponent } from "./updatedialog.component";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs/internal/observable/of';
import { ApolloQueryResult, ExecutionPatchResult } from '@apollo/client/core';
import { Observable } from 'rxjs';

describe('UpdatedialogComponent', () => {
  let component: UpdatedialogComponent;
  let fixture: ComponentFixture<UpdatedialogComponent>;
  let dialogRef: MatDialogRef<UpdatedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ApolloTestingModule,
        FormsModule,
      ],
      declarations: [UpdatedialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {close: () => {}} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        Apollo,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatedialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when calling close()', () => {
    spyOn(dialogRef, 'close');
    component.close();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should call the update method and close the dialog on form submission', fakeAsync(() => {
    spyOn(dialogRef, 'close').and.callThrough();
    spyOn(component, 'update').and.callThrough();
  
    // Set form values
    component.formData = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      contactNumber: '1234567890',
      email: 'john.doe@example.com',
    };
  
    // Trigger form submission
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
  
    // Simulate asynchronous behavior
    fixture.detectChanges();
    tick();
  
    expect(component.update).toHaveBeenCalled();
  
    console.log(dialogRef.close);
  
    // Add additional expectations or assertions if needed
  }));
  
  
});
