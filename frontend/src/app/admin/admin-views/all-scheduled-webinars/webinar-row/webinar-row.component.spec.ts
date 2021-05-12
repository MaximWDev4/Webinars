import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarRowComponent } from './webinar-row.component';

describe('WebinarRowComponent', () => {
  let component: WebinarRowComponent;
  let fixture: ComponentFixture<WebinarRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
