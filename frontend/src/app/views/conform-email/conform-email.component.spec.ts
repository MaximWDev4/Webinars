import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformEmailComponent } from './conform-email.component';

describe('ConformEmailComponent', () => {
  let component: ConformEmailComponent;
  let fixture: ComponentFixture<ConformEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConformEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConformEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
