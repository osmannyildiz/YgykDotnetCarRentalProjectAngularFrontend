import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  carDetails: CarDetail[] = [];
  dataLoaded: boolean = false;
  brands: Brand[] = [];
  colors: Color[] = [];
  filterText: string = "";
  filterBrandId: number = 0;
  filterColorId: number = 0;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService
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
    this.getBrands();
    this.getColors();
  }

  getCarDetails() {
    this.dataLoaded = false;
    this.carService.getAllCarDetails().subscribe((resp) => {
      this.carDetails = resp.data;
      this.dataLoaded = true;
    });
  }
  
  getCarDetailsByBrandId(brandId: number) {
    this.dataLoaded = false;
    this.carService.getAllCarDetailsByBrandId(brandId).subscribe((resp) => {
      this.carDetails = resp.data;
      this.dataLoaded = true;
    });
  }
  
  getCarDetailsByColorId(colorId: number) {
    this.dataLoaded = false;
    this.carService.getAllCarDetailsByColorId(colorId).subscribe((resp) => {
      this.carDetails = resp.data;
      this.dataLoaded = true;
    });
  }
  
  getCarDetailsByBrandIdAndColorId(brandId: number, colorId: number) {
    this.dataLoaded = false;
    this.carService.getAllCarDetailsByBrandIdAndColorId(brandId, colorId).subscribe((resp) => {
      this.carDetails = resp.data;
      this.dataLoaded = true;
    });
  }

  getBrands() {
    this.brandService.getAll().subscribe((resp) => {
      this.brands = resp.data;
    });
  }

  getColors() {
    this.colorService.getAll().subscribe((resp) => {
      this.colors = resp.data;
    });
  }

  filterByBrandIdAndColorId() {
    if (this.filterBrandId != 0 && this.filterColorId != 0) {
      this.getCarDetailsByBrandIdAndColorId(this.filterBrandId, this.filterColorId);
      this.toastrService.success("Araçlar seçilen marka ve renge göre filtrelendi.", "Filtre uygulandı");
    } else if (this.filterBrandId != 0) {
      this.getCarDetailsByBrandId(this.filterBrandId);
      this.toastrService.success("Araçlar seçilen markaya göre filtrelendi.", "Filtre uygulandı");
    } else if (this.filterColorId != 0) {
      this.getCarDetailsByColorId(this.filterColorId);
      this.toastrService.success("Araçlar seçilen renge göre filtrelendi.", "Filtre uygulandı");
    } else {
      this.getCarDetails();
      this.toastrService.info("Araçlara filtre uygulanmadı.", "Filtre kaldırıldı");
    }
  }
}
