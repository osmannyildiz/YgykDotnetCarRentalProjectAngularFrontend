import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-dropdown',
  templateUrl: './register-dropdown.component.html',
  styleUrls: ['./register-dropdown.component.css']
})
export class RegisterDropdownComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({});
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerCreds = this.registerForm.value;
      this.authService.register(registerCreds).subscribe({
        next: (resp) => {
          if (resp.success) {
            this.authService.setAccessToken(resp.data.token);
            this.userService.getUserInfoByEmail(registerCreds.email).subscribe({
              next: (resp) => {
                this.authService.setUserInfo(resp.data);
              }
            });
            this.toastrService.success(resp.message, "Başarılı");
          } else {
            this.toastrService.error(resp.message, "Hata");
          }
        },
        error: (errorResp) => {
          if (errorResp.error.validationFailures) {
            for (const failure of errorResp.error.validationFailures) {
              this.toastrService.error(failure.errorMessage, "Form Hatası");
            }
          } else {
            this.toastrService.error(errorResp.error.message, "Hata");
          }
        },
      });
    } else {
      this.toastrService.error("Lütfen formdaki hataları düzeltin.", "Form Hatası");
    }
  }
}
