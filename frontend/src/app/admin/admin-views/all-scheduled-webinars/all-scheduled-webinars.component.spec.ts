import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllScheduledWebinarsComponent } from './all-scheduled-webinars.component';

describe('AllScheduledWebinarsComponent', () => {
  let component: AllScheduledWebinarsComponent;
  let fixture: ComponentFixture<AllScheduledWebinarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllScheduledWebinarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllScheduledWebinarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
