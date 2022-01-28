import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';

import { rootNode$ } from '../../data';

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
export class ShowSubscriptionsComponent implements OnInit {
  show: boolean;
  Highcharts: typeof Highcharts = Highcharts;

  // get start of first subscription:
  xStart: Date = null;
  xEnd: Date = null;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'Subscriptions',
    },
    xAxis: {
      min: Date.UTC(2022, 0, 1), //getEarliestGrantStart().getDate(),
      max: Date.UTC(2024, 0, 1), //getLatesGrantEnd().getDate(),
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
    series: [
      {
        name: 'Account',
        type: 'gantt',
        data: [
          {
            id: 'HU_1',
            name: 'HU',
            y: 0,
            start: Date.UTC(2022, 0, 1),
            end: Date.UTC(2022, 2, 30),
            completed: 0.01,
            color: 'rgba(0,0,255, 0.3)',
          },
          {
            id: 'HU_2',
            name: 'HU',
            y: 0,
            start: Date.UTC(2022, 0, 1),
            end: Date.UTC(2022, 1, 30),
            completed: 0.01,
            color: 'rgba(0,0,255, 0.3)',
          },
          {
            name: 'HUH',
            y: 2,
            start: Date.UTC(2022, 0, 1),
            end: Date.UTC(2022, 4, 31),
            completed: 0.3,
          },
          {
            name: 'DEM',
            y: 3,
            start: Date.UTC(2022, 2, 1),
            end: Date.UTC(2022, 6, 30),
            completed: 0.2,
          },
        ],
      },
    ],
  };

  // series data for gantt:
  // loop all nodes
  // for each node: get the grants and add a separate line for It
  /* GIVE UP HERE ... 
  nodeSeries = {
    
    type: 'gantt',
    data:[],
  };

  // for each allocation in this node, create a new data
  nodeGrants: Grant[] = getAllGrantsForNodeSorted(currentNode.id);
  
  for (let g = 0; g < nodeGrants.length; g++) {
    let grant = nodeGrants[g];
    let data = {
      id: grant.id,
      name: grant.SKU.name,
      y: g,
      start: grant.start,
      end: grant.end,
      completed: g,
    };
    nodeSeries.data.push( data );
  }
  chartOptions.series.push(nodeSeries);
*/
  //grants: Grant[] = [];
  //allocs: AllocItem[] = [];
  //nodeConsumption: Consumption[] = [];
  //nodeId: string;

  constructor() {}

  ngOnInit() {}

  getResults(val: any) {
    //this.grants = getSortedGrantsByNodeId(this.nodeId);
    //this.allocs = getAllocationsForSingleNode(
    //  this.nodeId,
    //  AllocRestriction.Limit
    //);
    //this.nodeConsumption = getConsumptionForNode(this.nodeId);
  }

  /** returns the earliest start date of all grants 
  function getEarliestGrantStart(): Date {
    //loop all Allocations and find min Date
    return allGrants.reduce(function (prev, curr) {
      return prev.start < curr.start ? prev : curr;
    }).start;
  }*/

  /** returns the latest end date of all grants 
  function getLatesGrantEnd(): Date {
    //loop all Allocations and find min Date
    return allGrants.reduce(function (prev, curr) {
      return prev.start > curr.end ? prev : curr;
    }).end;
  }*/
}
