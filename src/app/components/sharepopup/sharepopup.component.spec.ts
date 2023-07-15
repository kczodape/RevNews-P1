import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharepopupComponent } from './sharepopup.component';

describe('SharepopupComponent', () => {
  let component: SharepopupComponent;
  let fixture: ComponentFixture<SharepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharepopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
