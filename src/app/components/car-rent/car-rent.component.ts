import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css']
})
export class CarRentComponent implements OnInit {
  car: Car = { id: 0, brandId: 0, colorId: 0, name: "", modelYear: 0, dailyPrice: 0, description: "" }
  carDetail: CarDetail = { carId: 0, carName: "", brandId: 0, brandName: "", colorId: 0, colorName: "", carDailyPrice: 0};
  todayDateStr: string = this.dateToStr(new Date());
  rentDateStr: string = this.todayDateStr;
  returnDateStr: string = this.todayDateStr;
  rentalDayCount: number = 1;
  totalPrice: number = this.car.dailyPrice;
  formError: string = "";
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
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
    this.formError = "";
    let rentDate = this.strToDate(this.rentDateStr);
    let returnDate = this.strToDate(this.returnDateStr);
    this.rentalDayCount = this.getDayCount(rentDate, returnDate);
    if (this.rentalDayCount < 1) {
      this.formError = "İade tarihi, kira başlangıç tarihinden önce olamaz.";
    }
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
    this.calculateTotalPrice();
  }

  continueToPayment() {
    this.validateForm();
    if (this.formError) {
      this.toastrService.error("Lütfen formda belirtilen hataları düzeltin.", "Hata!");
      return;
    };
    
    this.router.navigate([this.rentDateStr, this.returnDateStr, "payment"], {relativeTo: this.activatedRoute});
  }
}
