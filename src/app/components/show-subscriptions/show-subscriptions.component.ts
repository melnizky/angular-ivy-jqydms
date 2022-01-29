import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';

import { Subscription } from 'rxjs';
import { rootNode$ } from '../../data';
import { Node } from '../../models';

import {
  getAllocationsForSingleNode,
  getConsumptionForNode,
  getSortedGrantsByNodeId,
  getAllGrantsForNodeSorted,
} from '../../misc';
import { AllocItem, AllocRestriction, Consumption, Grant } from '../../models';

@Component({
  selector: 'app-show-subscriptions',
  templateUrl: './show-subscriptions.component.html',
  styleUrls: ['./show-subscriptions.component.css'],
})
export class ShowSubscriptionsComponent implements OnInit, OnDestroy {
  show: boolean;

  // some highchart thingies ...
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'chart';
  chartCallback;
  chart;
  updateFlag = false;
  // all nodes with their grants in a flat array
  series = [];

  // some data tracking:
  earliestStart = 0;
  latestEnd = 0;

  // event listener subscriptions:
  private subscriptions: Subscription[] = [];
  valueChange: EventEmitter<string>;

  // get start of first subscription:
  xStart: Date = null;
  xEnd: Date = null;

  chartOptions: Highcharts.Options = {};

  /**
   * This method created the data series objects for the GANTT chart (or _should_ do that ...)
   */
  buildDataSeries(node: Node, i: number) {
    var data = [];

    const name = node.name;
    const type = 'gantt';
    var grants = getSortedGrantsByNodeId(node.id);
    var data = [];
    if (grants && grants.length > 0) {
      for (let g = 0; g < grants.length; g++) {
        var grant = grants[g];
        // get earliest start and latest end date
        this.earliestStart = (this.earliestStart == 0 || this.earliestStart > grant.from ? grant.from : this.earliestStart);
        this.latestEnd = (this.latestEnd == 0 || this.latestEnd < grant.to? grant.to : this.latestEnd);

        data.push({
          id: grant.sku + '_' + g,
          name: grant.sku,
          y: g,
          start: grant.from,
          end: grant.to,
          completed: g / 100,
          color: this.getColor(grant.sku),
        });
      }
    }
    this.series.push({
      name: name,
      type: type,
      data: data,
    });

    if (!node.children) {
      return;
    }

    for (let c of node.children) {
      this.buildDataSeries(c, i + 1);
    }
  }

  constructor() {
    this.valueChange = new EventEmitter();

    // START copy
    // taken From https://codesandbox.io/s/oomo7424pz?file=/src/app/chart.component.ts:787-907
    const self = this;
    this.chartCallback = (chart) => {
      // saving chart reference
      self.chart = chart;
    };
    // STOP copy
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions.push(
      rootNode$.subscribe((node) => this.buildDataSeries(node, 0))
    );
    // enforce update on the data:
    this.chartOptions = {
      title: {
        text: 'Subscriptions',
      },
      xAxis: {
        min: this.earliestStart, 
        max: this.latestEnd,
      },
      yAxis: [
        {
          title: { text: '' },
          type: 'treegrid',
          labels: {
            align: 'left',
            levels: [
              {
                level: 1 /** Consumer Level */,
                style: {
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                },
              },
              {
                level: 2 /** SKU Level */,
                style: {
                  fontSize: '12px',
                  fontWeight: 'bold',
                },
              },
            ],
          },
        },
      ],
      series: this.series,
    };

    // now check  the options:
    console.log(this.chartOptions);
  }

  getColor(sku: String): String {
    if (sku == 'HUH') {
      return '#006bba';
    } else if (sku == 'DDU') {
      return '#00848e';
    } else if (sku == 'ASU') {
      return '#393db0';
    } else if (sku == 'CAU') {
      return '#612c85';
    } else if (sku == 'DCU') {
      return '#c9a000';
    }
    return '#898989';
  }

  getFirstDate(): number {
    return Date.UTC(2021, 0, 1);
  }

  getLastDate(): number {
    return Date.UTC(2023, 11, 31);
  }

  updateChart() {
    const self = this,
      chart = this.chart;
    self.updateFlag = true;
  }
}
