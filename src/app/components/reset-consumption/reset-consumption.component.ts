import { Component, OnInit } from '@angular/core';
import { resetConsumption } from '../../misc';

@Component({
  selector: 'app-reset-consumption',
  templateUrl: './reset-consumption.component.html',
  styleUrls: ['./reset-consumption.component.css'],
})
export class ResetConsumptionComponent implements OnInit {
  show = false;

  constructor() {}

  ngOnInit() {}

  reset() {
    resetConsumption();
  }
}
