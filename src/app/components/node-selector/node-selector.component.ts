import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { rootNode$ } from '../../data';
import { Node } from '../../models';

@Component({
  selector: 'app-node-selector',
  templateUrl: './node-selector.component.html',
  styleUrls: ['./node-selector.component.css'],
})
export class NodeSelectorComponent implements OnInit, OnDestroy {
  @Output('selectChange')
  valueChange: EventEmitter<string>;
  options: { value: string; label: string }[] = [];

  private subscriptions: Subscription[] = [];

  constructor() {
    this.valueChange = new EventEmitter();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }

  buildOptions(node: Node, i: number) {
    const v = node.id;
    const l = `${'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'.repeat(i)}${node.id}`;
    this.options.push({ value: v, label: l });

    if (!node.children) {
      return;
    }

    for (let c of node.children) {
      this.buildOptions(c, i + 1);
    }
  }

  ngOnInit() {
    this.subscriptions.push(
      rootNode$.subscribe((node) => this.buildOptions(node, 0))
    );
  }

  updateValue(evt) {
    this.valueChange.emit(evt.target.value);
  }
}
