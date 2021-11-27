import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {
  rentalDetails: RentalDetail[] = [];
  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getRentalDetails() {
    this.rentalService.getAllRentalDetails().subscribe((resp) => {
      this.rentalDetails = resp.data;
    });
  }
}
