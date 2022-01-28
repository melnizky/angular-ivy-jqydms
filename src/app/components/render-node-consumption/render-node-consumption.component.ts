import { Component, Input, OnInit } from '@angular/core';
import { Consumption } from '../../models';

@Component({
  selector: 'app-render-node-consumption',
  templateUrl: './render-node-consumption.component.html',
  styleUrls: ['./render-node-consumption.component.css'],
})
export class RenderNodeConsumptionComponent implements OnInit {
  @Input() consumption: Consumption[] = [];

  constructor() {}

  ngOnInit() {}
}
