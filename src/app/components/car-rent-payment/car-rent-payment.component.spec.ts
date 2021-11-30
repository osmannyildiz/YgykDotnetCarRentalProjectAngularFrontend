import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentPaymentComponent } from './car-rent-payment.component';

describe('CarRentPaymentComponent', () => {
  let component: CarRentPaymentComponent;
  let fixture: ComponentFixture<CarRentPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarRentPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
