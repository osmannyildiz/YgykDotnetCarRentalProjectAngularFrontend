import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css'],
})
export class ColorsComponent implements OnInit {
  colors: Color[] = [];
  currentColorId: number = 0;
  constructor(
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.currentColorId = params['colorId'];
      }
    });
  }

  getColors() {
    this.colorService.getAll().subscribe((resp) => {
      this.colors = resp.data;
    });
  }

  setCurrentColor(color: Color) {
    this.currentColorId = color.id;
  }

  unsetCurrentColor() {
    this.currentColorId = 0;
  }

  getActiveClassIfEqualsCurrentColor(color: Color) {
    if (this.currentColorId == color.id) {
      return 'active';
    } else {
      return '';
    }
  }

  getActiveClassIfNoCurrentColor() {
    if (this.currentColorId == 0) {
      return 'active';
    } else {
      return '';
    }
  }
}
