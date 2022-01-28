import { Component, OnInit } from '@angular/core';
import {
  addConsumption,
  assignConsumptionToGrant,
  generateId,
} from '../../misc';
import { Consumption, featureToSkuMapping, SKU } from '../../models';

@Component({
  selector: 'app-add-consumption',
  templateUrl: './add-consumption.component.html',
  styleUrls: ['./add-consumption.component.css'],
})
export class AddConsumptionComponent implements OnInit {
  show = false;
  nodeId: string;
  sku: SKU = undefined;

  ngOnInit() {}

  add(val: any) {
    const c: Consumption = {
      id: generateId(),
      amount: val.amount,
      sku: this.sku,
      feature: val.feature,
      from: new Date(val.from).getTime(),
      to: new Date(val.from).getTime(),
    };
    addConsumption(this.nodeId, c);
    assignConsumptionToGrant(this.nodeId, c);
  }

  getSku(ft) {
    this.sku = featureToSkuMapping[ft];
  }
}
