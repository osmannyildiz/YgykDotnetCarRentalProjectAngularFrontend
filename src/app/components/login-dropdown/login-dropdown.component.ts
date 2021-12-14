import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-dropdown',
  templateUrl: './login-dropdown.component.html',
  styleUrls: ['./login-dropdown.component.css']
})
export class LoginDropdownComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['asdf@ghjk.com', Validators.required],
      password: ['Sifre12345', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginCreds = this.loginForm.value;
      this.authService.login(loginCreds).subscribe({
        next: (resp) => {
          if (resp.success) {
            this.authService.setAccessToken(resp.data.token);
            this.userService.getUserInfoByEmail(loginCreds.email).subscribe({
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
