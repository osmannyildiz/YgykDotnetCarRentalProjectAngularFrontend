import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandForm: FormGroup = this.formBuilder.group({});
  constructor(private formBuilder: FormBuilder, private brandService: BrandService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createBrandForm();
  }

  createBrandForm() {
    this.brandForm = this.formBuilder.group({
      name: ["", Validators.required],
    });
  }

  addBrand() {
    if (this.brandForm.valid) {
      let brand = this.brandForm.value;
      this.brandService.add(brand).subscribe({
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
