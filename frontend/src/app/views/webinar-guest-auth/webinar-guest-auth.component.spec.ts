import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarGuestAuthComponent } from './webinar-guest-auth.component';

describe('WebinarGuestAuthComponent', () => {
  let component: WebinarGuestAuthComponent;
  let fixture: ComponentFixture<WebinarGuestAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarGuestAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarGuestAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
