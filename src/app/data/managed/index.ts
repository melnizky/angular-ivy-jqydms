import {
  GrantType,
  DynatraceAccount,
  Environment,
  featuresDisabledTemplate,
  featuresEnabledTemplate,
  SKU,
  Grant,
  Cluster,
  AllocItem,
} from '../../models';

export const managedAccount: DynatraceAccount = {
  id: 'account-managed',
  name: 'Classic Managed',
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const clusterProd: Cluster = {
  id: 'cluster-prod',
  name: 'PROD CLUSTER',
  account: managedAccount,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const clusterNonprod: Cluster = {
  id: 'cluster-non-prod',
  name: 'NONPROD CLUSTER',
  account: managedAccount,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envA: Environment = {
  id: 'cxs95594',
  name: 'PROD A - cxs95594',
  account: managedAccount,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envB: Environment = {
  id: 'inh77359',
  name: 'PROD B - inh77359',
  account: managedAccount,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envC: Environment = {
  id: 'elf55360',
  name: 'NONPROD elf55360',
  account: managedAccount,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

clusterProd.children = [envA, envB];
clusterNonprod.children = [envC];
managedAccount.children = [clusterProd, clusterNonprod];

export const managedGrants: Grant[] = [
  {
    from: Date.UTC(2021, 3, 1),
    to: Date.UTC(2022, 2, 31),
    type: GrantType.Paid,
    priority: 2,
    consumption: [],
    sku: SKU.HUH,
    amount: 20000,
    remainingAmount: 20000,
    id: 'sb.001.huh',
    nodeId: 'account-managed',
    canBeSplit: true,
  },
  {
    from: Date.UTC(2021, 3, 1),
    to: Date.UTC(2022, 2, 31),
    type: GrantType.Paid,
    priority: 2,
    consumption: [],
    sku: SKU.DEM,
    amount: 25_000_000,
    remainingAmount: 25_000_000,
    id: 'sb.001.dem',
    nodeId: 'account-managed',
    canBeSplit: true,
  },
  {
    from: Date.UTC(2021, 3, 1),
    to: Date.UTC(2022, 2, 31),
    type: GrantType.Paid,
    priority: 2,
    consumption: [],
    sku: SKU.DDU,
    amount: 10_000_000,
    remainingAmount: 10_000_000,
    id: 'sb.001.ddu',
    nodeId: 'account-managed',
    canBeSplit: true,
  },
  {
    from: Date.UTC(2021, 3, 1),
    to: Date.UTC(2022, 2, 31),
    type: GrantType.Free,
    priority: 1,
    consumption: [],
    sku: SKU.DDU,
    amount: 200_000,
    remainingAmount: 200_000,
    id: 'sb.001.ddu-free',
    nodeId: 'cluster-prod',
    canBeSplit: false,
  },
  {
    from: Date.UTC(2021, 3, 1),
    to: Date.UTC(2022, 2, 31),
    type: GrantType.Free,
    priority: 1,
    consumption: [],
    sku: SKU.DDU,
    amount: 200_000,
    remainingAmount: 200_000,
    id: 'sb.001.ddu-free',
    nodeId: 'cluster-non-prod',
    canBeSplit: false,
  },
];

export const managedAllocs: AllocItem[] = [];
