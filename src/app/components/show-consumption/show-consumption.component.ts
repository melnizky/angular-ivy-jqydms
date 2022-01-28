import { Component, OnInit } from '@angular/core';
import {
  getAllocationsForSingleNode,
  getConsumptionForNode,
  getSortedGrantsByNodeId,
} from '../../misc';
import { AllocItem, AllocRestriction, Consumption, Grant } from '../../models';

@Component({
  selector: 'app-show-consumption',
  templateUrl: './show-consumption.component.html',
  styleUrls: ['./show-consumption.component.css'],
})
export class ShowConsumptionComponent implements OnInit {
  show: boolean;
  grants: Grant[] = [];
  allocs: AllocItem[] = [];
  nodeConsumption: Consumption[] = [];
  nodeId: string;

  constructor() {}

  ngOnInit() {}

  getResults(val: any) {
    this.grants = getSortedGrantsByNodeId(this.nodeId);
    this.allocs = getAllocationsForSingleNode(
      this.nodeId,
      AllocRestriction.Limit
    );
    this.nodeConsumption = getConsumptionForNode(this.nodeId);
  }
}
