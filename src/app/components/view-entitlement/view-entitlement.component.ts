import { Component, Input, OnInit } from '@angular/core';
import { entitle } from '../../misc';
import { Node } from '../../models';

@Component({
  selector: 'app-view-entitlement',
  templateUrl: './view-entitlement.component.html',
  styleUrls: ['./view-entitlement.component.css'],
})
export class ViewEntitlementComponent implements OnInit {
  show = false;
  @Input() node: Node;

  constructor() {}

  ngOnInit() {}

  entitle(val: any) {
    const when = new Date(val.when).getTime();
    entitle(this.node, when);
  }

  get today(): Date {
    return new Date();
  }
}
