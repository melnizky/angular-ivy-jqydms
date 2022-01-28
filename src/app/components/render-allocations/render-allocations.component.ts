import { Component, Input, OnInit } from '@angular/core';
import { AllocItem, Grant } from '../../models';

@Component({
  selector: 'app-render-allocations',
  templateUrl: './render-allocations.component.html',
  styleUrls: ['./render-allocations.component.css'],
})
export class RenderAllocationsComponent implements OnInit {
  @Input() items: Grant[];

  constructor() {}

  ngOnInit() {}
}
