import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  allocations$,
  contracts$,
  grants$,
  rootNode$,
  selectAccount,
} from '../data';
import {
  AllocItem,
  AllocRestriction,
  Consumption,
  Contract,
  DpsRateCard,
  Features,
  Grant,
  Node,
  SKU,
} from '../models';
import { RenderService } from '../services/render.service';

let allGrants: Grant[] = [];
let allAllocations: AllocItem[] = [];
let currentAccount: Node = {} as any;

export function subscribe(): Observable<{ node: Node; contracts: Contract[] }> {
  return combineLatest([rootNode$, grants$, allocations$, contracts$]).pipe(
    map(([n, g, a, c]) => {
      currentAccount = n;
      allGrants = g;
      allAllocations = a;
      return { node: n, contracts: c };
    })
  );
}

//////////////////////////  COMMON //////////////////////////

export function generateId(): string {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);
}

//////////////////////////  NODES //////////////////////////

export function getNode(nodeId: string, current: Node = currentAccount): Node {
  if (current.id === nodeId) {
    return current;
  }
  if (!current.children) {
    return undefined;
  }
  for (let c of current.children) {
    let n = getNode(nodeId, c);
    if (n) {
      return n;
    }
  }
  return undefined;
}

export function getParent(
  nodeId: string,
  current: Node = currentAccount
): Node {
  if (!current.children) return undefined;

  if (current.children.find((x) => x.id === nodeId)) {
    return current;
  }

  for (let c of current.children) {
    let m = getParent(nodeId, c);
    if (m) {
      return m;
    }
  }
  return undefined;
}

export function addNodeAsChild(parent: Node, node: Node) {
  if (!parent.children) {
    parent.children = [];
  }
  parent.children.push(node);
}

export function addNodeAsParent(at: Node, node: Node) {
  const parent = getParent(at.id);
  if (!parent) {
    // New node becomes the new root
    node.children = [at];
    selectAccount(node, [], [], []);
    return;
  }

  if (!parent.children) {
    parent.children = [];
  }
  const i = parent.children.indexOf(at);
  if (i >= 0) {
    // Remove node 'at' from its current parent
    parent.children.splice(i, 1);
  }
  parent.children.push(node);
  node.children = [at];
}

export function deleteNode(node: Node) {
  const parent = getParent(node.id);
  if (!parent) {
    return;
  }
  const i = parent.children.indexOf(node);
  parent.children.splice(i, 1);
}

function getNodesOnLevel(
  level: number,
  current: Node,
  currentLevel: number = 0
): Node[] {
  if (level === currentLevel) {
    return [current];
  }

  if (!current.children) {
    return [];
  }

  const result: Node[] = [];
  for (let c of current.children) {
    const nodes = getNodesOnLevel(level, c, currentLevel + 1);
    result.push(...nodes);
  }
  return result;
}

function getLevelOfNode(
  nodeId: string,
  current: Node,
  level: number = 0
): number {
  if (current.id === nodeId) {
    return level;
  }

  if (!current.children) {
    return undefined;
  }

  for (let c of current.children) {
    const l = getLevelOfNode(nodeId, c, level + 1);
    if (l !== undefined) {
      return l;
    }
  }

  return undefined;
}

//////////////////////////  GRANTS //////////////////////////

export const skusAreEnabledUnderDps: SKU[] = [
  SKU.HUH,
  SKU.DEM,
  SKU.DDU,
  SKU.DCU,
];

export const defaultDpsRateCard: DpsRateCard = {
  huhFactor: 0.1,
  demFactor: 0.2,
  dduFactor: 0.3,
  asuFactor: 0.4,
  cauFactor: 0.5,
  dcuFactor: 0.6,
};

export function getSortedGrantsByNodeId(nodeId: string): Grant[] {
  return allGrants
    .filter((x) => x.nodeId === nodeId)
    .sort((x, y) =>
      x.priority - y.priority === 0 ? x.to - y.to : x.priority - y.priority
    );
}

export function getGrantsOnNode(nodeId: string): Grant[] {
  return allGrants
    .filter((x) => x.nodeId === nodeId)
    .sort((x, y) =>
      x.priority - y.priority === 0 ? x.to - y.to : x.priority - y.priority
    );
}

export function getAllGrantsForNodeSorted(nodeId: string): Grant[] {
  if (!nodeId) {
    return [];
  }

  const parent = getParent(nodeId);
  const currentGrants = getGrantsOnNode(nodeId);
  const parentGrants = getAllGrantsForNodeSorted(parent?.id);
  return currentGrants.concat(parentGrants);
}

export function getAllGrantsForNodeAndSkuAndTimeframeSorted(
  nodeId: string,
  sku: SKU,
  from: number,
  to: number
): Grant[] {
  // Hack alert: DPS is an edge case since a DPS subscription applies for all other features / SKUs
  return getAllGrantsForNodeSorted(nodeId).filter(
    (x) =>
      (x.sku === sku ||
        (x.sku === SKU.DPS && skusAreEnabledUnderDps.some((y) => y === sku))) &&
      x.from <= from &&
      x.to >= to
  );
}

export function getAllGrantsForNodeAndSkuAndFeatureAndTimeframeSorted(
  nodeId: string,
  sku: SKU,
  feature: string,
  from: number,
  to: number
): Grant[] {
  const k = getAllGrantsForNodeSorted(nodeId);
  return getAllGrantsForNodeSorted(nodeId).filter(
    (x) =>
      // x.sku === sku &&
      x.features[`${feature}`] === true && x.from <= from && x.to >= to
  );
}

export function getOverallRemainingGrantAmount(
  nodeId: string,
  sku: SKU,
  from: number,
  to: number
): [number, number] {
  const grants = getAllGrantsForNodeAndSkuAndTimeframeSorted(
    nodeId,
    sku,
    from,
    to
  );
  return [
    grants.map((x) => x.remainingAmount).reduce((x, y) => x + y, 0),
    grants.length,
  ];
}

export function getOverallRemainingGrantAmountConsideringFeature(
  nodeId: string,
  sku: SKU,
  feature: string,
  from: number,
  to: number
): [number, number] {
  const grants = getAllGrantsForNodeAndSkuAndFeatureAndTimeframeSorted(
    nodeId,
    sku,
    feature,
    from,
    to
  );
  return [
    grants.map((x) => x.remainingAmount).reduce((x, y) => x + y, 0),
    grants.length,
  ];
}

export function removeGrant(item: Grant): void {
  const i = allGrants.indexOf(item);
  if (i >= 0) {
    allGrants.splice(i, 1);
  }
}

export function addGrant(item: Grant): void {
  allGrants.push(item);
}

/////////////////////////// CONSUMPTION ///////////////////////////

export function addConsumption(nodeId: string, consumption: Consumption) {
  const node = getNode(nodeId);
  node.consumption.push(consumption);
  assignConsumptionToNodeAllocations(nodeId, consumption);

  const parent = getParent(nodeId);
  if (!parent) {
    return;
  }
  addConsumption(parent.id, consumption);
}

export function assignConsumptionToNodeAllocations(
  nodeId: string,
  consumption: Consumption
) {
  // Assumption: there can only be one allocation for this combination of node, sku and timeframe
  const allocs = allAllocations.filter(
    (x) =>
      x.nodeId === nodeId &&
      x.sku === consumption.sku &&
      x.from <= consumption.from &&
      x.to >= consumption.to
  );

  for (let a of allocs) {
    // If the consumption in question is already assigned to this very allocation then skip it and crack on.
    if (a.consumption.find((c) => c.id === consumption.id)) {
      continue;
    }
    a.consumption.push(consumption);
    const r = a.remaining - consumption.amount;
    a.remaining = Math.max(0, r);
  }
}

export function assignConsumptionToGrant(
  nodeId: string,
  consumption: Consumption
): boolean {
  const items = getAllGrantsForNodeAndSkuAndFeatureAndTimeframeSorted(
    nodeId,
    consumption.sku,
    consumption.feature,
    consumption.from,
    consumption.to
  );
  if (items.length === 0) {
    return false;
  }
  let remainingConsumption = { ...consumption };
  let i = 1;
  for (let item of items) {
    if (item.remainingAmount <= 0) {
      // Then this allocation is already used up, let's have a look at the next one
      continue;
    }

    // Hack alert: DPS!
    if (item.sku === SKU.DPS) {
      const ratedAmount = getRatedAmountForDps(consumption, item);
      if (item.remainingAmount >= ratedAmount) {
        bookDpsConsumption(remainingConsumption, item);
        return true; // we were able to allocate at once
      }
    } else {
      if (item.remainingAmount >= remainingConsumption.amount) {
        item.consumption.push(remainingConsumption);
        item.remainingAmount -= remainingConsumption.amount;
        return true; // we were able to allocate at once
      }
    }

    remainingConsumption.source = consumption;
    remainingConsumption.id = `${consumption.id}.${i}`;
    const c = { ...remainingConsumption };
    if (item.sku === SKU.DPS) {
      // Hack alert: DPS!
      const ratingFactor = getRatingFactorForDps(c, item);
      c.amount = item.remainingAmount / ratingFactor; // Use up all DPS budget that's left
      bookDpsConsumption(c, item);
    } else {
      c.amount = item.remainingAmount; // Use up all that's left from the subscription
      item.consumption.push(c);
      item.remainingAmount = 0;
    }
    remainingConsumption.amount -= c.amount;
    i++;
  }

  if (remainingConsumption.amount <= 0) {
    return true; // we were able to allocate eventually
  }

  const c = { ...remainingConsumption, id: `${consumption.id}.${i}` };
  const item = items[items.length - 1];
  item.consumption.push(c);
  return false;
}

function bookDpsConsumption(consumption: Consumption, grant: Grant) {
  let factor = getRatingFactorForDps(consumption, grant);
  const deduction = Math.round(consumption.amount * factor);
  consumption.ratedAmount = deduction;
  consumption.ratingFactor = factor;
  grant.consumption.push(consumption);
  grant.remainingAmount -= deduction;
}

function getRatedAmountForDps(consumption: Consumption, grant: Grant) {
  let factor = getRatingFactorForDps(consumption, grant);
  return Math.round(consumption.amount * factor);
}

function getRatingFactorForDps(consumption: Consumption, grant: Grant) {
  let factor = 0;

  switch (consumption.sku) {
    case SKU.HUH:
      factor = grant.rateCard.huhFactor;
      break;
    case SKU.DEM:
      factor = grant.rateCard.demFactor;
      break;
    case SKU.DDU:
      factor = grant.rateCard.dduFactor;
      break;
    case SKU.ASU:
      factor = grant.rateCard.asuFactor;
      break;
    case SKU.CAU:
      factor = grant.rateCard.cauFactor;
      break;
    case SKU.DCU:
      factor = grant.rateCard.dcuFactor;
      break;
  }
  return factor;
}

export function getConsumptionForNode(nodeId: string): Consumption[] {
  return getNode(nodeId)?.consumption;
}

function getConsumptionForNodeAndSkuAndTimeframe(
  nodeId: string,
  sku: SKU,
  from: number,
  to: number
): Consumption[] {
  return getConsumptionForNode(nodeId).filter(
    (x) => x.sku === sku && from <= x.from && to >= x.to
  );
}

export function resetConsumption(node: Node = currentAccount) {
  node.consumption = [];
  const grants = allGrants.filter((x) => x.nodeId === node.id);

  for (let g of grants) {
    g.consumption = [];
    g.remainingAmount = g.amount;
  }

  if (!node.children) {
    return;
  }
  for (let c of node.children) {
    resetConsumption(c);
  }
}

//////////////////////////  ALLOCATIONS //////////////////////////

export function removeAllocation(item: AllocItem): void {
  const i = allAllocations.indexOf(item);
  if (i >= 0) {
    allAllocations.splice(i, 1);
  }
}

// This is more complex: we also need to take into account reservations ancestors but only if they're consuming from the same grant as the node in question. That's a bit tricky and I have no nerve to keep going today. Something for another day or maybe PMs to think through :-)
export function getAffectingReservationsForNode(
  nodeId: string,
  sku: SKU,
  from: number,
  to: number
): number {
  const level = getLevelOfNode(nodeId, currentAccount);
  const siblings = getNodesOnLevel(level, currentAccount);
  let reservationsOfSiblings = 0;
  for (let s of siblings) {
    const overlappingReservations = getAllocationsForSingleNode(
      s.id,
      AllocRestriction.Reservation
    ).filter((x) => x.sku === sku && x.from < to && x.to > from);

    reservationsOfSiblings += overlappingReservations
      .map((r) => r.amount)
      .reduce((x, y) => x + y, 0);
  }
  return reservationsOfSiblings;
}

export function addAllocation(item: AllocItem): void {
  switch (item.type) {
    case AllocRestriction.Limit:
      addLimitAllocation(item);
      break;
    case AllocRestriction.Reservation:
      console.error('Reservations are not yet supported');

      // const [limit, numberOfLimits] = getMinimumRemainingLimitAmount(
      //   item.nodeId,
      //   item.sku,
      //   item.from,
      //   item.to
      // );
      // const [grants, numberOfGrants] = getOverallRemainingGrantAmount(
      //   item.nodeId,
      //   item.sku,
      //   item.from,
      //   item.to
      // );

      // // 1. Get all reservations on the same level of the current node.
      // const level = getLevelOfNode(item.nodeId, currentAccount);
      // const siblings = getNodesOnLevel(level, currentAccount, 0);
      // let reservationsOfSiblings = 0;
      // for (let s of siblings) {
      //   const reservations = getAllocationsForSingleNode(
      //     s.id,
      //     AllocRestriction.Reservation
      //   );
      //   reservationsOfSiblings += reservations
      //     .map((r) => r.amount)
      //     .reduce((x, y) => x + y, 0);
      // }

      // console.log('Reservations: ', reservationsOfSiblings);

      // 2. Check if the reservation amount is less or equal to the available value on this level

      // 3. Check if the reservation amount is less or equal to the remaining granted

      // 4. Check if the reservation amount is less or qual to the minimum remaining limit

      // Then we should be good

      // To be continued...
      break;
  }
}

function addLimitAllocation(item: AllocItem): void {
  allAllocations.push(item);

  const node = getNode(item.nodeId);
  assignExistingConsumptionToAllocation(item, node);
}

function assignExistingConsumptionToAllocation(item: AllocItem, node: Node) {
  const nodeConsumption = getConsumptionForNodeAndSkuAndTimeframe(
    node.id,
    item.sku,
    item.from,
    item.to
  );
  nodeConsumption.forEach((x) =>
    assignConsumptionToNodeAllocations(node.id, x)
  );

  if (!node.children) {
    return;
  }
  for (let c of node.children) {
    assignExistingConsumptionToAllocation(item, c);
  }
}

export function getAllocationsForSingleNode(
  nodeId: string,
  type: AllocRestriction
): AllocItem[] {
  return allAllocations
    .filter((x) => x.nodeId === nodeId && x.type === type)
    .sort((x, y) => x.from - y.from);
}

export function getAllocsForNodeAndAbove(
  nodeId: string,
  type: AllocRestriction
): AllocItem[] {
  if (!nodeId) {
    return [];
  }

  const parent = getParent(nodeId);
  const currentAllocs = getAllocationsForSingleNode(nodeId, type);
  const parentAllocs = getAllocsForNodeAndAbove(parent?.id, type);
  return currentAllocs.concat(parentAllocs);
}

export function getAllocsForNodeAndAboveWithSkuAndTimeframe(
  nodeId: string,
  sku: SKU,
  from: number,
  to: number,
  type: AllocRestriction
): AllocItem[] {
  return getAllocsForNodeAndAbove(nodeId, type).filter(
    (x) => x.sku === sku && x.from <= from && x.to >= to
  );
}

export function getMinimumRemainingLimitAmount(
  nodeId: string,
  sku: SKU,
  from: number,
  to: number
): [number, number] {
  const allocs = getAllocsForNodeAndAboveWithSkuAndTimeframe(
    nodeId,
    sku,
    from,
    to,
    AllocRestriction.Limit
  );
  if (allocs.length === 0) {
    return [undefined, 0];
  }
  return [
    allocs.map((x) => x.remaining).sort((x, y) => x - y)[0],
    allocs.length,
  ];
}

export function entitle(
  node: Node = currentAccount,
  when: number,
  parentFeatures: Features = undefined
) {
  const features = getEntitlement(node.id, when);
  node.features = { ...features };

  if (!node.children) {
    return;
  }
  for (let c of node.children) {
    entitle(c, when, node.features);
  }
}

function getManualSettingFor(
  node: Node,
  fn: (x: Features) => boolean
): boolean {
  if (!node) {
    return true;
  }
  if (!fn(node.manualSettingsForFeatures)) {
    return false;
  }
  const parent = getParent(node.id);
  return getManualSettingFor(parent, fn);
}

function getEntitlement(nodeId: string, when: number): Features {
  const minAllocHUHs = getMinimumRemainingLimitAmount(
    nodeId,
    SKU.HUH,
    when,
    when
  );
  const minAllocDEMs = getMinimumRemainingLimitAmount(
    nodeId,
    SKU.DEM,
    when,
    when
  );
  const minAllocDDUs = getMinimumRemainingLimitAmount(
    nodeId,
    SKU.DDU,
    when,
    when
  );
  const minAllocASUs = getMinimumRemainingLimitAmount(
    nodeId,
    SKU.ASU,
    when,
    when
  );
  const minAllocCAUs = getMinimumRemainingLimitAmount(
    nodeId,
    SKU.CAU,
    when,
    when
  );
  const minAllocDCUs = getMinimumRemainingLimitAmount(
    nodeId,
    SKU.DCU,
    when,
    when
  );

  const remainingHUHsForHostMonitoring =
    getOverallRemainingGrantAmountConsideringFeature(
      nodeId,
      SKU.HUH,
      'HostMonitoring',
      when,
      when
    );
  const remainingDEMsForWeb = getOverallRemainingGrantAmountConsideringFeature(
    nodeId,
    SKU.DEM,
    'WebSessions',
    when,
    when
  );
  const remainingDEMsForMobile =
    getOverallRemainingGrantAmountConsideringFeature(
      nodeId,
      SKU.DEM,
      'MobileSessions',
      when,
      when
    );
  const remainingDDUsForMetrics =
    getOverallRemainingGrantAmountConsideringFeature(
      nodeId,
      SKU.DDU,
      'Metrics',
      when,
      when
    );
  const remainingDDUsForLogs = getOverallRemainingGrantAmountConsideringFeature(
    nodeId,
    SKU.DDU,
    'Logs',
    when,
    when
  );
  const remainingASUsForVD = getOverallRemainingGrantAmountConsideringFeature(
    nodeId,
    SKU.ASU,
    'VulnerabilityDetections',
    when,
    when
  );
  const remainingASUsForRASP = getOverallRemainingGrantAmountConsideringFeature(
    nodeId,
    SKU.ASU,
    'RASP',
    when,
    when
  );
  const remainingCAUsForFt1 = getOverallRemainingGrantAmountConsideringFeature(
    nodeId,
    SKU.CAU,
    'CloudAutomationFt1',
    when,
    when
  );
  const remainingDCUsForFt1 = getOverallRemainingGrantAmountConsideringFeature(
    nodeId,
    SKU.DCU,
    'DeusComputationFt1',
    when,
    when
  );

  const node = getNode(nodeId);
  const manuallyEnabledHostMonitoring = getManualSettingFor(
    node,
    (x) => x.HostMonitoring
  );
  const manuallyEnabledWebSessions = getManualSettingFor(
    node,
    (x) => x.WebSessions
  );
  const manuallyEnabledMobileSessions = getManualSettingFor(
    node,
    (x) => x.MobileSessions
  );
  const manuallyEnabledMetrics = getManualSettingFor(node, (x) => x.Metrics);
  const manuallyEnabledLogs = getManualSettingFor(node, (x) => x.Logs);
  const manuallyEnabledVulnerabilityDetections = getManualSettingFor(
    node,
    (x) => x.VulnerabilityDetections
  );
  const manuallyEnabledRASP = getManualSettingFor(node, (x) => x.RASP);
  const manuallyEnabledCloudAutomationFt1 = getManualSettingFor(
    node,
    (x) => x.CloudAutomationFt1
  );
  const manuallyEnabledDeusComputationFt1 = getManualSettingFor(
    node,
    (x) => x.DeusComputationFt1
  );

  return {
    HostMonitoring:
      manuallyEnabledHostMonitoring &&
      remainingHUHsForHostMonitoring[0] > 0 &&
      allocOk(minAllocHUHs),
    WebSessions:
      manuallyEnabledWebSessions &&
      remainingDEMsForWeb[0] > 0 &&
      allocOk(minAllocDEMs),
    MobileSessions:
      manuallyEnabledMobileSessions &&
      remainingDEMsForMobile[0] > 0 &&
      allocOk(minAllocDEMs),
    Metrics:
      manuallyEnabledMetrics &&
      remainingDDUsForMetrics[0] > 0 &&
      allocOk(minAllocDDUs),
    Logs:
      manuallyEnabledLogs &&
      remainingDDUsForLogs[0] > 0 &&
      allocOk(minAllocDDUs),
    RASP:
      manuallyEnabledRASP &&
      remainingASUsForRASP[0] > 0 &&
      allocOk(minAllocASUs),
    VulnerabilityDetections:
      manuallyEnabledVulnerabilityDetections &&
      remainingASUsForVD[0] > 0 &&
      allocOk(minAllocASUs),
    CloudAutomationFt1:
      manuallyEnabledCloudAutomationFt1 &&
      remainingCAUsForFt1[0] > 0 &&
      allocOk(minAllocCAUs),
    DeusComputationFt1:
      manuallyEnabledDeusComputationFt1 &&
      remainingDCUsForFt1[0] > 0 &&
      allocOk(minAllocDCUs),
  };
}

function allocOk(alloc: [number, number]): boolean {
  // Either no limit exists or the limit has some remaining units left
  return alloc[1] === 0 || alloc[0] > 0;
}
