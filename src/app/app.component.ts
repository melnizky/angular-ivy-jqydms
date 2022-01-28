import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { managedAndSaas } from './data/managed-and-saas';
import { subscribe } from './misc';
import { Node } from './models';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  rootNode$ = subscribe().pipe(tap(() => this.contractId === undefined));
  printCurrentAccountStructure = false;
  contractId: string;

  constructor() {}

  contractChange(f) {
    this.contractId = f.contractId;
  }
}
