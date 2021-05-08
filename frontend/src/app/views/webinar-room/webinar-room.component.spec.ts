import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebinarRoomComponent } from './webinar-room.component';

describe('WebinarRoomComponent', () => {
  let component: WebinarRoomComponent;
  let fixture: ComponentFixture<WebinarRoomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebinarRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
