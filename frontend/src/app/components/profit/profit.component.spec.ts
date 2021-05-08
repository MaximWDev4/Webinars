import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfitComponent } from './profit.component';

describe('ProfitComponent', () => {
  let component: ProfitComponent;
  let fixture: ComponentFixture<ProfitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
