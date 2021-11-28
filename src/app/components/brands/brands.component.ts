import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  currentBrandId: number = 0;
  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.currentBrandId = params['brandId'];
      }
    });
  }

  getBrands() {
    this.brandService.getAll().subscribe((resp) => {
      this.brands = resp.data;
    });
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrandId = brand.id;
  }

  unsetCurrentBrand() {
    this.currentBrandId = 0;
  }

  getActiveClassIfEqualsCurrentBrand(brand: Brand) {
    if (this.currentBrandId == brand.id) {
      return 'active';
    } else {
      return '';
    }
  }

  getActiveClassIfNoCurrentBrand() {
    if (this.currentBrandId == 0) {
      return 'active';
    } else {
      return '';
    }
  }
}
