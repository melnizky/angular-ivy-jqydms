import { Component, Input, OnInit } from '@angular/core';
import { allPreconfiguredAccounts, selectAccount } from '../../data';
import { Node } from '../../models';

@Component({
  selector: 'app-modify-account-structure',
  templateUrl: './modify-account-structure.component.html',
  styleUrls: ['./modify-account-structure.component.css'],
})
export class ModifyAccountStructureComponent implements OnInit {
  show = false;
  @Input() node: Node;
  accounts = allPreconfiguredAccounts.map((x) => x.node);

  constructor() {}

  ngOnInit() {}

  selectAccount(val) {
    const index: number = val.target.value;
    const a = allPreconfiguredAccounts[index];
    selectAccount(a.node, a.grants, a.allocs, a.contracts);
  }
}
