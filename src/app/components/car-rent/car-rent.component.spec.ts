import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentComponent } from './car-rent.component';

describe('CarRentComponent', () => {
  let component: CarRentComponent;
  let fixture: ComponentFixture<CarRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
