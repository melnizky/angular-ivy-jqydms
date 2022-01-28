import { Component, Input, OnInit } from '@angular/core';
import { AllocItem } from '../../models';

@Component({
  selector: 'app-render-allocations-2',
  templateUrl: './render-alloctions-2.component.html',
  styleUrls: ['./render-alloctions-2.component.css'],
})
export class RenderAlloctions2Component implements OnInit {
  @Input() items: AllocItem[];

  constructor() {}

  ngOnInit() {}
}
