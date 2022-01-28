import { Component, OnInit } from '@angular/core';
import {
  getAffectingReservationsForNode,
  getAllGrantsForNodeAndSkuAndFeatureAndTimeframeSorted,
  getAllGrantsForNodeAndSkuAndTimeframeSorted,
  getAllocsForNodeAndAboveWithSkuAndTimeframe,
  getMinimumRemainingLimitAmount,
  getOverallRemainingGrantAmount,
  getOverallRemainingGrantAmountConsideringFeature,
} from '../../misc';
import { AllocItem, AllocRestriction, Grant } from '../../models';

@Component({
  selector: 'app-get-valid-alloc-items',
  templateUrl: './get-valid-alloc-items.component.html',
  styleUrls: ['./get-valid-alloc-items.component.css'],
})
export class GetValidAllocItemsComponent {
  grants: Grant[] = [];
  overallRemainingAmount: number = 0;
  minRemainingAllocationAmount = 0;
  bookedReservations = 0;
  allocs: AllocItem[] = [];
  show: boolean = false;
  nodeId: string;

  constructor() {}

  search(val) {
    this.grants =
      val.feature && val.feature.length > 0
        ? getAllGrantsForNodeAndSkuAndFeatureAndTimeframeSorted(
            this.nodeId,
            val.sku,
            val.feature,
            new Date(val.from).getTime(),
            new Date(val.to).getTime()
          )
        : getAllGrantsForNodeAndSkuAndTimeframeSorted(
            this.nodeId,
            val.sku,
            new Date(val.from).getTime(),
            new Date(val.to).getTime()
          );

    this.allocs = getAllocsForNodeAndAboveWithSkuAndTimeframe(
      this.nodeId,
      val.sku,
      new Date(val.from).getTime(),
      new Date(val.to).getTime(),
      AllocRestriction.Limit
    );

    [this.overallRemainingAmount] =
      val.feature && val.feature.length > 0
        ? getOverallRemainingGrantAmountConsideringFeature(
            this.nodeId,
            val.sku,
            val.feature,
            new Date(val.from).getTime(),
            new Date(val.to).getTime()
          )
        : getOverallRemainingGrantAmount(
            this.nodeId,
            val.sku,
            new Date(val.from).getTime(),
            new Date(val.to).getTime()
          );

    [this.minRemainingAllocationAmount] = getMinimumRemainingLimitAmount(
      this.nodeId,
      val.sku,
      new Date(val.from).getTime(),
      new Date(val.to).getTime()
    );

    // this.bookedReservations = getAffectingReservationsForNode(
    //   this.nodeId,
    //   val.sku,
    //   new Date(val.from).getTime(),
    //   new Date(val.to).getTime()
    // );
  }
}
