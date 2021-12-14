import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from 'src/app/models/userInfo';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  userInfoForm: FormGroup = this.formBuilder.group({});
  passwordChangeForm: FormGroup = this.formBuilder.group({});
  userInfo: UserInfo = { id: 0, firstName: "", lastName: "", email: "", customerId: 0, customerCompanyName: "" };
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private userService: UserService, 
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createUserInfoForm();
    this.getUserInfo();
    this.createPasswordChangeForm();
  }

  createUserInfoForm() {
    this.userInfoForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      customerCompanyName: ["", Validators.required],
    });
  }

  createPasswordChangeForm() {
    this.passwordChangeForm = this.formBuilder.group({
      currentPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      newPasswordConfirm: ["", Validators.required],
    });
  }
  
  fillUserInfoForm() {
    this.userInfoForm.get("firstName")?.setValue(this.userInfo.firstName);
    this.userInfoForm.get("lastName")?.setValue(this.userInfo.lastName);
    this.userInfoForm.get("email")?.setValue(this.userInfo.email);
    this.userInfoForm.get("customerCompanyName")?.setValue(this.userInfo.customerCompanyName);
  }
  
  getUserInfo() {
    this.userService.getUserInfoByUserId(this.authService.getUserId()).subscribe((resp) => {
      this.userInfo = resp.data;
      this.fillUserInfoForm();
    });
  }
  
  updateUserInfo() {
    if (this.userInfoForm.valid) {
      let formValue = this.userInfoForm.value;
      this.userInfo.firstName = formValue.firstName;
      this.userInfo.lastName = formValue.lastName;
      this.userInfo.email = formValue.email;
      this.userInfo.customerCompanyName = formValue.customerCompanyName;
      this.userService.updateUserInfo(this.userInfo).subscribe({
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

  changePassword() {
    if (this.passwordChangeForm.valid) {
      let formValue = this.passwordChangeForm.value;
      if (formValue.newPassword === formValue.newPasswordConfirm) {
        this.authService.changePassword(formValue.currentPassword, formValue.newPassword).subscribe({
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
        this.toastrService.error("Girdiğiniz yeni şifreler birbirleriyle eşleşmiyor.", "Form Hatası");
      }
    } else {
      this.toastrService.error("Lütfen formdaki hataları düzeltin.", "Form Hatası");
    }
  }
}
