import { Component, Input, OnInit } from '@angular/core';
import { addNodeAsChild, addNodeAsParent, deleteNode } from '../../misc';
import {
  Cluster,
  DynatraceAccount,
  featuresDisabledTemplate,
  featuresEnabledTemplate,
  Node,
} from '../../models';

@Component({
  selector: 'app-simple-node',
  templateUrl: './simple-node.component.html',
  styleUrls: ['./simple-node.component.scss'],
})
export class SimpleNodeComponent implements OnInit {
  @Input() node: Node;

  constructor() {}

  ngOnInit() {}

  add(
    at: Node,
    val: { nodeId: string; type: string },
    asParent: boolean = false
  ) {
    let node: Node = {
      id: val.nodeId,
      name: val.nodeId,
      consumption: [],
      features: { ...featuresDisabledTemplate },
      manualSettingsForFeatures: { ...featuresEnabledTemplate },
    };
    switch (val.type) {
      case 'keptn':
        node.manualSettingsForFeatures = {
          ...featuresDisabledTemplate,
          CloudAutomationFt1: true,
        };
        break;
      case 'account':
      case 'cluster':
      case 'environment':
      case 'grouper':
      case 'deus':
        break;
      default:
        // Unknown???
        return;
    }

    if (asParent) {
      addNodeAsParent(at, node);
    } else {
      addNodeAsChild(at, node);
    }
  }

  delete(node: Node) {
    deleteNode(node);
  }
}
