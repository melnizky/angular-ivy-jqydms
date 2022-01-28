import { defaultDpsRateCard } from '../../misc';
import {
  GrantType,
  DynatraceAccount,
  Environment,
  featuresDisabledTemplate,
  featuresEnabledTemplate,
  SKU,
  Grant,
  Grouper,
  Cluster,
  AllocItem,
  AllocRestriction,
} from '../../models';

export const dpsAndNonDps: DynatraceAccount = {
  id: 'dps-and-non-dps',
  name: 'DPS and Non-DPS',
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const managed: Grouper = {
  id: 'managed-contract',
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
  name: 'Managed',
};

const saas: Grouper = {
  id: 'saas-contract',
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
  name: 'SaaS',
};

const clusterA: Cluster = {
  id: 'cluster-a',
  name: 'Cluster A',
  account: dpsAndNonDps,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const clusterB: Cluster = {
  id: 'cluster-b',
  name: 'Cluster B',
  account: dpsAndNonDps,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envA: Environment = {
  id: 'cxs95594',
  name: 'SLB-PROD - cxs95594',
  account: dpsAndNonDps,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envB: Environment = {
  id: 'inh77359',
  name: 'SLB Sandbox - inh77359',
  account: dpsAndNonDps,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envC: Environment = {
  id: 'elf55360',
  name: 'SLB-NONPROD elf55360',
  account: dpsAndNonDps,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envD: Environment = {
  id: 'saas-prod',
  name: 'Internal - Prod',
  account: dpsAndNonDps,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envE: Environment = {
  id: 'saas-staging',
  name: 'Internal - Staging',
  account: dpsAndNonDps,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

dpsAndNonDps.children = [managed, saas];
managed.children = [clusterA, clusterB];
clusterA.children = [envA];
clusterB.children = [envB, envC];

saas.children = [envD, envE];

export const dpsAndNonDpsGrants: Grant[] = [
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2022, 5, 30),
    type: GrantType.Paid,
    priority: 2,
    consumption: [],
    sku: SKU.HUH,
    amount: 20_000,
    remainingAmount: 20_000,
    id: 'sb.001.huh',
    nodeId: 'managed-contract',
    canBeSplit: true,
  },
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2022, 5, 30),
    type: GrantType.Paid,
    priority: 2,
    consumption: [],
    sku: SKU.DEM,
    amount: 25_000_000,
    remainingAmount: 25_000_000,
    id: 'sb.001.dem',
    nodeId: 'managed-contract',
    canBeSplit: true,
  },
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2022, 5, 30),
    type: GrantType.Paid,
    priority: 2,
    consumption: [],
    sku: SKU.DDU,
    amount: 10_000_000,
    remainingAmount: 10_000_000,
    id: 'sb.001.ddu',
    nodeId: 'managed-contract',
    canBeSplit: true,
  },
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Free,
    priority: 1,
    consumption: [],
    sku: SKU.DDU,
    amount: 200_000,
    remainingAmount: 200_000,
    id: 'sb.001.ddu-free',
    nodeId: 'cluster-a',
    canBeSplit: false,
  },
  {
    from: Date.UTC(2022, 0, 1),
    to: Date.UTC(2022, 5, 30),
    type: GrantType.Free,
    priority: 1,
    consumption: [],
    sku: SKU.DDU,
    amount: 100_000,
    remainingAmount: 100_000,
    id: 'sb.001.ddu-free',
    nodeId: 'cluster-a',
    canBeSplit: false,
  },
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Free,
    priority: 1,
    consumption: [],
    sku: SKU.DDU,
    amount: 200_000,
    remainingAmount: 200_000,
    id: 'sb.001.ddu-free',
    nodeId: 'cluster-b',
    canBeSplit: false,
  },
  {
    from: Date.UTC(2022, 0, 1),
    to: Date.UTC(2022, 5, 30),
    type: GrantType.Free,
    priority: 1,
    consumption: [],
    sku: SKU.DDU,
    amount: 100_000,
    remainingAmount: 100_000,
    id: 'sb.001.ddu-free',
    nodeId: 'cluster-b',
    canBeSplit: false,
  },
  {
    from: Date.UTC(2022, 0, 1),
    to: Date.UTC(2022, 5, 30),
    type: GrantType.Paid,
    priority: 2,
    consumption: [],
    sku: SKU.DEM,
    amount: 150_000,
    remainingAmount: 150_000,
    id: 'sb.001.ddu-free',
    nodeId: 'saas-contract',
    canBeSplit: false,
  },
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2022, 5, 30),
    type: GrantType.Paid,
    priority: 3,
    consumption: [],
    sku: SKU.DPS,
    amount: 750_000,
    remainingAmount: 750_000,
    id: 'sb.001.ddu-free',
    nodeId: 'saas-contract',
    canBeSplit: false,
    rateCard: {
      huhFactor: 0.1,
      demFactor: 0.2,
      dduFactor: 0.3,
      asuFactor: 0,
      cauFactor: 0,
      dcuFactor: 0.4,
    },
  },
];

export const dpsAndNonDpsAllocs: AllocItem[] = [
  // {
  //   from: Date.UTC(2021, 0, 1),
  //   to: Date.UTC(2022, 5, 30),
  //   type: AllocRestriction.Reservation,
  //   consumption: [],
  //   sku: SKU.DDU,
  //   amount: 500_000,
  //   remaining: 500_000,
  //   id: '',
  //   nodeId: 'cxs95594',
  // },
  // {
  //   from: Date.UTC(2021, 0, 1),
  //   to: Date.UTC(2022, 5, 30),
  //   type: AllocRestriction.Reservation,
  //   consumption: [],
  //   sku: SKU.DDU,
  //   amount: 500_000,
  //   remaining: 500_000,
  //   id: '',
  //   nodeId: 'inh77359',
  // },
  // {
  //   from: Date.UTC(2021, 0, 1),
  //   to: Date.UTC(2022, 5, 30),
  //   type: AllocRestriction.Reservation,
  //   consumption: [],
  //   sku: SKU.DDU,
  //   amount: 500_000,
  //   remaining: 500_000,
  //   id: '',
  //   nodeId: 'cluster-b',
  // },
];
