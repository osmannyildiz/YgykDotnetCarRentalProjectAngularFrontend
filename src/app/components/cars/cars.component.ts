import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  carDetails: CarDetail[] = [];
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarDetailsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarDetailsByColorId(params['colorId']);
      } else {
        this.getCarDetails();
      }
    });
  }

  getCarDetails() {
    this.carService.getAllCarDetails().subscribe((resp) => {
      this.carDetails = resp.data;
    });
  }
  
  getCarDetailsByBrandId(brandId: number) {
    this.carService.getAllCarDetailsByBrandId(brandId).subscribe((resp) => {
      this.carDetails = resp.data;
    });
  }
  
  getCarDetailsByColorId(colorId: number) {
    this.carService.getAllCarDetailsByColorId(colorId).subscribe((resp) => {
      this.carDetails = resp.data;
    });
  }
}
