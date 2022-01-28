import { BehaviorSubject } from 'rxjs';
import {
  AllocItem,
  Contract,
  defaultFeaturesASUs,
  defaultFeaturesCAU,
  defaultFeaturesDCU,
  defaultFeaturesDDU,
  defaultFeaturesDEM,
  defaultFeaturesDPS,
  defaultFeaturesHuh,
  Grant,
  Node,
  SKU,
} from '../models';
import { saasAccount, saasAllocs, saasGrants } from './saas';
import {
  managedAndSaas,
  managedAndSaasGrants,
  managedAndSaasAllocs,
} from './managed-and-saas';
import { managedAccount, managedAllocs, managedGrants } from './managed';
import { msp, mspAllocs, mspGrants } from './msp';
import {
  dpsAndNonDps,
  dpsAndNonDpsAllocs,
  dpsAndNonDpsGrants,
} from './dps-and-non-dps';
import {
  saasWithContractsAccount,
  saasWithContractsAllocs,
  saasWithContractsContracts,
  saasWithContractsGrants,
} from './saasWithContracts';

const rootNodeSubj = new BehaviorSubject<Node>(saasAccount);
export const rootNode$ = rootNodeSubj.asObservable();

const grantSubj = new BehaviorSubject<Grant[]>(
  enrichWithEnabledFeatures(saasGrants)
);
export const grants$ = grantSubj.asObservable();

const allocationSubj = new BehaviorSubject<AllocItem[]>(saasAllocs);
export const allocations$ = allocationSubj.asObservable();

const contractsSubj = new BehaviorSubject<Contract[]>(undefined);
export const contracts$ = contractsSubj.asObservable();

export function selectAccount(
  node: Node,
  grants: Grant[],
  allocs: AllocItem[],
  contracts: Contract[]
) {
  rootNodeSubj.next(node);
  grantSubj.next(enrichWithEnabledFeatures(grants));
  allocationSubj.next(allocs);
  contractsSubj.next(contracts);
}

// Hack alert: just a helper that in the aftermath adds the related features per SKU
function enrichWithEnabledFeatures(grants: Grant[]) {
  for (let g of grants) {
    if (!g.features) {
      switch (g.sku) {
        case SKU.HUH:
          g.features = { ...defaultFeaturesHuh };
          break;
        case SKU.DEM:
          g.features = { ...defaultFeaturesDEM };
          break;
        case SKU.DDU:
          g.features = { ...defaultFeaturesDDU };
          break;
        case SKU.ASU:
          g.features = { ...defaultFeaturesASUs };
          break;
        case SKU.CAU:
          g.features = { ...defaultFeaturesCAU };
          break;
        case SKU.DCU:
          g.features = { ...defaultFeaturesDCU };
          break;
        case SKU.DPS:
          g.features = { ...defaultFeaturesDPS };
          break;
      }
    }
  }
  return grants;
}

export const allPreconfiguredAccounts: {
  node: Node;
  grants: Grant[];
  allocs: AllocItem[];
  contracts?: Contract[];
}[] = [
  {
    node: saasAccount,
    grants: saasGrants,
    allocs: saasAllocs,
  },
  { node: managedAccount, grants: managedGrants, allocs: managedAllocs },
  {
    node: dpsAndNonDps,
    grants: dpsAndNonDpsGrants,
    allocs: dpsAndNonDpsAllocs,
  },
  {
    node: managedAndSaas,
    grants: managedAndSaasGrants,
    allocs: managedAndSaasAllocs,
  },
  {
    node: msp,
    grants: mspGrants,
    allocs: mspAllocs,
  },
  {
    node: saasWithContractsAccount,
    grants: saasWithContractsGrants,
    allocs: saasWithContractsAllocs,
    contracts: saasWithContractsContracts,
  },
];
