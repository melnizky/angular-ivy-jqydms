import { Component, Input } from '@angular/core';
import { sap } from '../../data/sap';
import { Node } from '../../models';

@Component({
  selector: 'app-entitlement',
  templateUrl: './entitlement.component.html',
  styleUrls: ['./entitlement.component.scss'],
})
export class EntitlementComponent {
  @Input() node: Node = sap;
}
