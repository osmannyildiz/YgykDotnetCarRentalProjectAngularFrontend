import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rent-payment',
  templateUrl: './car-rent-payment.component.html',
  styleUrls: ['./car-rent-payment.component.css']
})
export class CarRentPaymentComponent implements OnInit {
  car: Car = { id: 0, brandId: 0, colorId: 0, name: "", modelYear: 0, dailyPrice: 0, description: "" }
  carDetail: CarDetail = { carId: 0, carName: "", brandId: 0, brandName: "", colorId: 0, colorName: "", carDailyPrice: 0};
  todayDateStr: string = this.dateToStr(new Date());
  rentDateStr: string = this.todayDateStr;
  returnDateStr: string = this.todayDateStr;
  rentalDayCount: number = 1;
  totalPrice: number = this.car.dailyPrice;
  creditCardNumber: string = "1234123412341234";
  creditCardExpiry: string = "01/23";
  creditCardCvc: string = "123";
  formError: string = "";
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCar(params["carId"]);
      this.getCarDetail(params["carId"]);
      this.rentDateStr = params["rentDateStr"];
      this.returnDateStr = params["returnDateStr"];
      this.calculateTotalPrice();
    });
  }

  getCar(carId: number) {
    this.carService.getById(carId).subscribe((resp) => {
      this.car = resp.data;
      this.calculateTotalPrice();
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe((resp) => {
      this.carDetail = resp.data;
    });
  }

  calculateTotalPrice() {
    let rentDate = this.strToDate(this.rentDateStr);
    let returnDate = this.strToDate(this.returnDateStr);
    this.rentalDayCount = this.getDayCount(rentDate, returnDate);
    this.totalPrice = this.rentalDayCount * this.car.dailyPrice;
  }

  getDayCount(startDate: Date, endDate: Date) {
    return Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24) + 1;
  }

  dateToStr(date: Date) {
    let y = "" + date.getFullYear();
    let m = "" + date.getMonth();
    m = m.padStart(2, "0");
    let d = "" + date.getDate();
    d = d.padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  strToDate(str: string) {
    return new Date(str);
  }

  validateForm() {
    this.formError = "";
    if (this.creditCardNumber.length !== 16) {
      this.formError = "Kredi kartı numarası hatalı.";
    }
  }

  rent() {
    this.validateForm();
    if (this.formError) {
      this.toastrService.error("Lütfen formda belirtilen hataları düzeltin.", "Hata!");
      return;
    };

    this.paymentService.process(this.creditCardNumber, this.creditCardExpiry, this.creditCardCvc).subscribe({
      next: resp => {
        if (resp.success) {
          // TODO: Kullanıcı sistemi olmadığı için şu anda tüm kiralamalar Kodlama.io müşterisi üzerine yapılıyor (customerId = 3)
          this.rentalService.add(this.car.id, 3, this.strToDate(this.rentDateStr), this.strToDate(this.returnDateStr)).subscribe({
            next: resp => {
              if (resp.success) {
                this.toastrService.success(resp.message, "İşlem başarılı!");
              } else {
                this.toastrService.error(resp.message, "Hata!");
              }
            },
            error: errorResp => {
              this.toastrService.error(errorResp.error.message, "Hata!");
            }
          });
        } else {
          this.toastrService.error(resp.message, "Hata!");
        }
      },
      error: errorResp => {
        this.toastrService.error(errorResp.error.message, "Hata!");
      }
    });
  }
}
