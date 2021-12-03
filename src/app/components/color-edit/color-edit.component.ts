import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {
  colorForm: FormGroup = this.formBuilder.group({});
  color: Color = { id: 0, name: "" };
  constructor(
    private formBuilder: FormBuilder, 
    private colorService: ColorService, 
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getColor(params["colorId"]);
    });
    this.createColorForm();
  }

  getColor(colorId: number) {
    this.colorService.getById(colorId).subscribe((resp) => {
      this.color = resp.data;
      this.fillColorForm();
    });
  }

  createColorForm() {
    this.colorForm = this.formBuilder.group({
      name: ["", Validators.required],
    });
  }

  fillColorForm() {
    this.colorForm.get("name")?.setValue(this.color.name);
  }

  updateColor() {
    if (this.colorForm.valid) {
      let color = this.colorForm.value;
      color.id = this.color.id;
      this.colorService.update(color).subscribe({
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
