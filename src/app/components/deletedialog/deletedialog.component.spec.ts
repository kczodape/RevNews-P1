import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { DeletedialogComponent } from './deletedialog.component';

describe('DeletedialogComponent', () => {
  let component: DeletedialogComponent;
  let fixture: ComponentFixture<DeletedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, ApolloTestingModule],
      declarations: [DeletedialogComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
