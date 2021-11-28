import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: Car = { id: 0, brandId: 0, colorId: 0, name: "", modelYear: 0, dailyPrice: 0, description: "" }
  carDetail: CarDetail = { carId: 0, carName: "", brandId: 0, brandName: "", colorId: 0, colorName: "", carDailyPrice: 0};
  carImages: CarImage[] = [];
  imageHost: string = "https://localhost:44305";
  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCar(params["carId"]);
      this.getCarDetail(params["carId"]);
      this.getCarImages(params["carId"]);
    });
  }

  getCar(carId: number) {
    this.carService.getById(carId).subscribe((resp) => {
      this.car = resp.data;
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe((resp) => {
      this.carDetail = resp.data;
    });
  }

  getCarImages(carId: number) {
    this.carImageService.getAllByCarId(carId).subscribe((resp) => {
      this.carImages = resp.data;
    });
  }
}
