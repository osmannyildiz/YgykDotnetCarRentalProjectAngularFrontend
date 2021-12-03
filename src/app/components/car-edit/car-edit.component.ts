import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  carForm: FormGroup = this.formBuilder.group({});
  car: Car = { id: 0, brandId: 0, colorId: 0, name: "", modelYear: 0, dailyPrice: 0, description: "" }
  brands: Brand[] = [];
  colors: Color[] = [];
  constructor(
    private formBuilder: FormBuilder, 
    private carService: CarService, 
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCar(params["carId"]);
    });
    this.getBrands();
    this.getColors();
    this.createCarForm();
  }

  getCar(carId: number) {
    this.carService.getById(carId).subscribe((resp) => {
      this.car = resp.data;
      this.fillCarForm();
    });
  }

  createCarForm() {
    this.carForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      name: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  fillCarForm() {
    this.carForm.get("brandId")?.setValue(this.car.brandId);
    this.carForm.get("colorId")?.setValue(this.car.colorId);
    this.carForm.get("name")?.setValue(this.car.name);
    this.carForm.get("modelYear")?.setValue(this.car.modelYear);
    this.carForm.get("dailyPrice")?.setValue(this.car.dailyPrice);
    this.carForm.get("description")?.setValue(this.car.description);
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

  updateCar() {
    if (this.carForm.valid) {
      let car = this.carForm.value;
      car.brandId = parseInt(car.brandId);
      car.colorId = parseInt(car.colorId);
      car.id = this.car.id;
      this.carService.update(car).subscribe({
        next: resp => {
          if (resp.success) {
            this.toastrService.success(resp.message, "Başarılı");
          } else {
            this.toastrService.error(resp.message, "Hata");
          }
        },
        error: errorResp => {
          if (errorResp.error.validationFailures) {
            for (const failure of errorResp.error.validationFailures) {
              this.toastrService.error(failure.errorMessage, "Form Hatası");
            }
          } else {
            this.toastrService.error(errorResp.error.message, "Hata");
          }
        }
      });
    } else {
      this.toastrService.error("Lütfen formdaki hataları düzeltin.", "Form Hatası");
    }
  }
}
