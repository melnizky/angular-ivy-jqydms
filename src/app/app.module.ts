import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { NodeComponent } from './components/node/node.component';
import { MakeNicePipe } from './make-nice.pipe';
import { AddAllocItemComponent } from './components/add-alloc-item/add-alloc-item.component';
import { GetValidAllocItemsComponent } from './components/get-valid-alloc-items/get-valid-alloc-items.component';
import { AddConsumptionComponent } from './components/add-consumption/add-consumption.component';
import { ShowConsumptionComponent } from './components/show-consumption/show-consumption.component';
import { RenderAllocationsComponent } from './components/render-allocations/render-allocations.component';
import { RenderNodeConsumptionComponent } from './components/render-node-consumption/render-node-consumption.component';
import { ResetConsumptionComponent } from './components/reset-consumption/reset-consumption.component';
import { EntitlementComponent } from './components/entitlement/entitlement.component';
import { ViewEntitlementComponent } from './components/view-entitlement/view-entitlement.component';
import { NodeSelectorComponent } from './components/node-selector/node-selector.component';
import { ModifyAccountStructureComponent } from './components/modify-account-structure/modify-account-structure.component';
import { SimpleNodeComponent } from './components/simple-node/simple-node.component';
import { RenderAlloctions2Component } from './components/render-alloctions-2/render-alloctions-2.component';
import { ShowSubscriptionsComponent } from './components/show-subscriptions/show-subscriptions.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HighchartsChartModule],
  declarations: [
    AppComponent,
    NodeComponent,
    MakeNicePipe,
    AddAllocItemComponent,
    GetValidAllocItemsComponent,
    AddConsumptionComponent,
    ShowConsumptionComponent,
    RenderAllocationsComponent,
    RenderNodeConsumptionComponent,
    ResetConsumptionComponent,
    EntitlementComponent,
    ViewEntitlementComponent,
    NodeSelectorComponent,
    ModifyAccountStructureComponent,
    SimpleNodeComponent,
    RenderAlloctions2Component,
    ShowSubscriptionsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
