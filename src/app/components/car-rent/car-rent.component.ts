import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})
export class CarRentComponent implements OnInit {
  car: Car = { id: 0, brandId: 0, colorId: 0, name: "", modelYear: 0, dailyPrice: 0, description: "" }
  carDetail: CarDetail = { carId: 0, carName: "", brandId: 0, brandName: "", colorId: 0, colorName: "", carDailyPrice: 0};
  todayDateStr: string = this.dateToStr(new Date())
  rentDateStr: string = this.todayDateStr;
  returnDateStr: string = this.todayDateStr;
  rentalDayCount: number = 1;
  totalPrice: number = this.car.dailyPrice;
  dateError: string = "";
  creditCardNumber: string = "1234123412341234";
  creditCardExpiry: string = "01/23";
  creditCardCvc: string = "123";
  paymentError: string = "";
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCar(params["carId"]);
      this.getCarDetail(params["carId"]);
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
    this.dateError = "";
    let rentDate = this.strToDate(this.rentDateStr);
    let returnDate = this.strToDate(this.returnDateStr);
    this.rentalDayCount = this.getDayCount(rentDate, returnDate);
    if (this.rentalDayCount < 1) {
      this.dateError = "İade tarihi, kira başlangıç tarihinden önce olamaz.";
    }
    this.totalPrice = this.rentalDayCount * this.car.dailyPrice;
  }

  getDayCount(startDate: Date, endDate: Date) {
    return Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24) + 1;
  }

  dateToStr(date: Date) {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }

  strToDate(str: string) {
    return new Date(str);
  }

  validateForm() {
    // Validate date section
    this.calculateTotalPrice();

    // Validate payment section
    this.paymentError = "";
    if (this.creditCardNumber.length !== 16) {
      this.paymentError = "Kredi kartı numarası hatalı.";
    }

    return this.dateError || this.paymentError;
  }

  rent() {
    let error = this.validateForm();
    if (error) {
      this.toastrService.error("Lütfen formda belirtilen hataları düzeltin.", "Hata!");
      return;
    };

    // TODO: Kullanıcı sistemi olmadığı için şu anda tüm kiralamalar Kodlama.io üzerine yapılıyor (customerId = 3)
    this.rentalService.Add(this.car.id, 3, this.strToDate(this.rentDateStr), this.strToDate(this.returnDateStr)).subscribe({
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
  }
}
