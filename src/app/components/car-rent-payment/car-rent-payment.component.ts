import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CreditCard } from 'src/app/models/creditCard';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rent-payment',
  templateUrl: './car-rent-payment.component.html',
  styleUrls: ['./car-rent-payment.component.css']
})
export class CarRentPaymentComponent implements OnInit {
  car: Car = { id: 0, brandId: 0, colorId: 0, name: "", modelYear: 0, dailyPrice: 0, description: "" }
  carDetail: CarDetail = { carId: 0, carName: "", brandId: 0, brandName: "", colorId: 0, colorName: "", carDailyPrice: 0};
  todayDateStr: string = this.dateToStr(new Date());
  rentDateStr: string = this.todayDateStr;
  returnDateStr: string = this.todayDateStr;
  rentalDayCount: number = 1;
  totalPrice: number = this.car.dailyPrice;
  creditCardForm: FormGroup = this.formBuilder.group({});
  creditCard: CreditCard = { id: 0, userId: 0, creditCardNumber: "", creditCardExpiryYear: "", creditCardExpiryMonth: "", creditCardCvc: "" };
  saveCreditCard: boolean = false;
  formError: string = "";
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private creditCardService: CreditCardService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCar(params["carId"]);
      this.getCarDetail(params["carId"]);
      this.rentDateStr = params["rentDateStr"];
      this.returnDateStr = params["returnDateStr"];
      this.calculateTotalPrice();
      this.createCreditCardForm();
      this.getCreditCard();
    });
  }

  getCar(carId: number) {
    this.carService.getById(carId).subscribe((resp) => {
      this.car = resp.data;
      this.calculateTotalPrice();
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe((resp) => {
      this.carDetail = resp.data;
    });
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      creditCardNumber: ["", [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      creditCardExpiryMonth: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      creditCardExpiryYear: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      creditCardCvc: ["", Validators.required],
      saveCreditCard: [false],
    });
  }
  
  getCreditCard() {
    this.creditCardService.getByUserId(this.authService.getUserId()).subscribe((resp) => {
      if (resp.success && resp.data != null) {
        console.log("kredi kartı geldi");
        this.creditCard = resp.data;
        this.saveCreditCard = true;
        this.fillCreditCardForm();
      }
    });
  }

  fillCreditCardForm() {
    this.creditCardForm.get("creditCardNumber")?.setValue(this.creditCard.creditCardNumber);
    this.creditCardForm.get("creditCardExpiryMonth")?.setValue(this.creditCard.creditCardExpiryMonth);
    this.creditCardForm.get("creditCardExpiryYear")?.setValue(this.creditCard.creditCardExpiryYear);
    this.creditCardForm.get("creditCardCvc")?.setValue(this.creditCard.creditCardCvc);
    this.creditCardForm.get("saveCreditCard")?.setValue(this.saveCreditCard);
  }

  calculateTotalPrice() {
    let rentDate = this.strToDate(this.rentDateStr);
    let returnDate = this.strToDate(this.returnDateStr);
    this.rentalDayCount = this.getDayCount(rentDate, returnDate);
    this.totalPrice = this.rentalDayCount * this.car.dailyPrice;
  }

  getDayCount(startDate: Date, endDate: Date) {
    return Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24) + 1;
  }

  dateToStr(date: Date) {
    let y = "" + date.getFullYear();
    let m = "" + date.getMonth();
    m = m.padStart(2, "0");
    let d = "" + date.getDate();
    d = d.padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  strToDate(str: string) {
    return new Date(str);
  }

  // validateForm() {
  //   this.formError = "";
  //   if (this.creditCard.creditCardNumber.length !== 16) {
  //     this.formError = "Kredi kartı numarası hatalı.";
  //   }
  // }

  rent() {
    // this.validateForm();
    // if (this.formError) {
    //   this.toastrService.error("Lütfen formda belirtilen hataları düzeltin.", "Hata!");
    //   return;
    // };

    console.warn(this.creditCardForm);
    if (this.creditCardForm.valid) {
      let formValue = this.creditCardForm.value;
      this.creditCard.userId = this.authService.getUserId(),
      this.creditCard.creditCardNumber = formValue.creditCardNumber,
      this.creditCard.creditCardExpiryMonth = formValue.creditCardExpiryMonth,
      this.creditCard.creditCardExpiryYear = formValue.creditCardExpiryYear,
      this.creditCard.creditCardCvc = formValue.creditCardCvc,

      this.paymentService.process(this.totalPrice, this.creditCard).subscribe({
        next: resp => {
          if (resp.success) {
            this.rentalService.add(this.car.id, this.authService.getUserCustomerId(), this.strToDate(this.rentDateStr), this.strToDate(this.returnDateStr)).subscribe({
              next: resp => {
                if (resp.success) {
                  this.toastrService.success(resp.message, "İşlem başarılı!");
                } else {
                  this.toastrService.error(resp.message, "Hata!");
                }
              },
              error: errorResp => {
                this.toastrService.error(errorResp.error.message, "Hata!");
              }
            });
          } else {
            this.toastrService.error(resp.message, "Hata!");
          }
        },
        error: errorResp => {
          this.toastrService.error(errorResp.error.message, "Hata!");
        }
      });

      if (formValue.saveCreditCard) {
        if (this.creditCard.id === 0) {
          this.creditCardService.add(this.creditCard).subscribe();
        } else {
          this.creditCardService.update(this.creditCard).subscribe();
        }
      } else {
        this.creditCardService.deleteById(this.creditCard.id).subscribe();
      }
    } else {
      this.toastrService.error("Lütfen formdaki hataları düzeltin.", "Form Hatası");
    }
  }
}
