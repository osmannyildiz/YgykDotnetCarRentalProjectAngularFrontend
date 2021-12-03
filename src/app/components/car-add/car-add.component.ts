import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carForm: FormGroup = this.formBuilder.group({});
  brands: Brand[] = [];
  colors: Color[] = [];
  constructor(
    private formBuilder: FormBuilder, 
    private carService: CarService, 
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService,
  ) {}

  ngOnInit(): void {
    this.createCarForm();
    this.getBrands();
    this.getColors();
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

  addCar() {
    if (this.carForm.valid) {
      let car = this.carForm.value;
      car.brandId = parseInt(car.brandId);
      car.colorId = parseInt(car.colorId);
      this.carService.add(car).subscribe({
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
