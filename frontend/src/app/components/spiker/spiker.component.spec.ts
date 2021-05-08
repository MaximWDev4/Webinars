import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpikerComponent } from './spiker.component';

describe('SpikerComponent', () => {
  let component: SpikerComponent;
  let fixture: ComponentFixture<SpikerComponent>;

  beforeEach(async(() => {
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
