import { Component, OnInit } from '@angular/core';
import { makeNiceFn } from '../../make-nice.pipe';
import {
  addAllocation,
  addGrant,
  defaultDpsRateCard,
  generateId,
  getAllocationsForSingleNode,
} from '../../misc';
import {
  AllocItem,
  AllocRestriction,
  defaultFeaturesASUs,
  defaultFeaturesCAU,
  defaultFeaturesDCU,
  defaultFeaturesDDU,
  defaultFeaturesDEM,
  defaultFeaturesDPS,
  defaultFeaturesHuh,
  Features,
  Grant,
  SKU,
} from '../../models';

@Component({
  selector: 'app-add-alloc-item',
  templateUrl: './add-alloc-item.component.html',
  styleUrls: ['./add-alloc-item.component.css'],
})
export class AddAllocItemComponent implements OnInit {
  errors: string[] = [];
  show: boolean = false;
  nodeId: string;
  features: Features = { ...defaultFeaturesHuh };

  ngOnInit() {}

  add(val: any) {
    this.errors = [];
    const i: Grant = {
      amount: +val.amount,
      remainingAmount: +val.amount,
      consumption: [],
      from: new Date(val.from).getTime(),
      to: new Date(val.to).getTime(),
      id: val.id.length > 0 ? val.id : generateId(),
      nodeId: this.nodeId,
      priority: val.prio,
      sku: val.sku,
      type: val.type,
      canBeSplit: false,
      features: { ...this.features },
    };
    if (i.sku === SKU.DPS) {
      // Hack alert: DPS
      i.rateCard = { ...defaultDpsRateCard };
    }

    addGrant(i);
  }

  addAllocation(val: any) {
    this.errors = [];

    const allocs = getAllocationsForSingleNode(
      this.nodeId,
      AllocRestriction.Limit
    ).filter((x) => x.sku === val.sku);
    if (allocs.length > 0) {
      this.errors.push(
        `On this node there's already ${allocs.length} other overlapping limit set. Multiple overlapping limits for the same SKU are not supported.`
      );
      return;
    }

    const a: AllocItem = {
      amount: val.amount,
      remaining: val.amount,
      from: new Date(val.from).getTime(),
      to: new Date(val.to).getTime(),
      id: generateId(),
      nodeId: this.nodeId,
      sku: val.sku,
      type: val.type,
      consumption: [],
    };

    addAllocation(a);
  }

  loadDefaultFeatures(x) {
    let defaultFeatures: Features = undefined;
    switch (x) {
      case 'HUH':
        defaultFeatures = defaultFeaturesHuh;
        break;
      case 'DEM':
        defaultFeatures = defaultFeaturesDEM;
        break;
      case 'DDU':
        defaultFeatures = defaultFeaturesDDU;
        break;
      case 'ASU':
        defaultFeatures = defaultFeaturesASUs;
        break;
      case 'CAU':
        defaultFeatures = defaultFeaturesCAU;
        break;
      case 'DCU':
        defaultFeatures = defaultFeaturesDCU;
        break;
      case 'DPS':
        defaultFeatures = defaultFeaturesDPS;
        break;
    }
    this.features = { ...defaultFeatures };
  }
}
