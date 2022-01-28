import { Component, Input } from '@angular/core';
import {
  getAllocationsForSingleNode,
  getSortedGrantsByNodeId,
  removeAllocation,
  removeGrant,
} from '../../misc';
import { AllocItem, AllocRestriction, Grant, Node } from '../../models';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent {
  @Input() node: Node;
  showAllocations = true;
  @Input() contractId = '2';

  get grants() {
    return getSortedGrantsByNodeId(this.node.id).filter(
      (x) => !this.contractId || this.contractId === x.contractId
    );
  }

  get allocs() {
    const limits = getAllocationsForSingleNode(
      this.node.id,
      AllocRestriction.Limit
    );
    const reservations = getAllocationsForSingleNode(
      this.node.id,
      AllocRestriction.Reservation
    );
    return limits.concat(reservations);
  }

  removeGrant(item: Grant) {
    removeGrant(item);
  }

  removeAlloc(item: AllocItem) {
    removeAllocation(item);
  }

  log(x) {
    console.log(x);
  }
}
