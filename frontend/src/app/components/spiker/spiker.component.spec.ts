import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpikerComponent } from './spiker.component';

describe('SpikerComponent', () => {
  let component: SpikerComponent;
  let fixture: ComponentFixture<SpikerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
