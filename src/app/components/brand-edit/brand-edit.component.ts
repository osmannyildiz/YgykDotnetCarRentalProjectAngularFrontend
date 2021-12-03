import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  brandForm: FormGroup = this.formBuilder.group({});
  brand: Brand = { id: 0, name: "" };
  constructor(
    private formBuilder: FormBuilder, 
    private brandService: BrandService, 
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getBrand(params["brandId"]);
    });
    this.createBrandForm();
  }

  getBrand(brandId: number) {
    this.brandService.getById(brandId).subscribe((resp) => {
      this.brand = resp.data;
      this.fillBrandForm();
    });
  }

  createBrandForm() {
    this.brandForm = this.formBuilder.group({
      name: ["", Validators.required],
    });
  }

  fillBrandForm() {
    this.brandForm.get("name")?.setValue(this.brand.name);
  }

  updateBrand() {
    if (this.brandForm.valid) {
      let brand = this.brandForm.value;
      brand.id = this.brand.id;
      this.brandService.update(brand).subscribe({
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
