import {
  Cluster,
  DEUS,
  DynatraceAccount,
  Environment,
  featuresDisabledTemplate,
  featuresEnabledTemplate,
  Grouper,
  Keptn,
  AllocRestriction,
  GrantType,
  SKU,
  AllocItem,
  Grant,
} from '../../models';

export const msp: DynatraceAccount = {
  id: 'account-msp',
  name: 'Managed Service Provider (MSP)',
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const clusterA: Cluster = {
  id: 'cluster-msp-a',
  name: 'Cluster MSP A',
  account: msp,
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const clusterB: Cluster = {
  id: 'cluster-msp-b',
  name: 'Cluster MSP B',
  account: msp,
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const clusterC: Cluster = {
  id: 'cluster-msp-c',
  name: 'Cluster MSP C',
  account: msp,
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envAA: Environment = {
  id: 'env-douglas-dev',
  name: 'Douglas Dev',
  consumption: [],
  account: msp,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envAB: Environment = {
  id: 'env-douglas-uat',
  name: 'Douglas UAT',
  consumption: [],
  account: msp,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envBA: Environment = {
  id: 'env-douglas-prod-1',
  name: 'Douglas Prod 1',
  consumption: [],
  account: msp,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envBB: Environment = {
  id: 'env-douglas-prod-2',
  name: 'Douglas Prod 2',
  consumption: [],
  account: msp,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envCA: Environment = {
  id: 'env-lutz-prod',
  name: 'Prod',
  consumption: [],
  account: msp,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envCE: Environment = {
  id: 'env-lutz-pre-prod',
  name: 'Pre-Prod',
  consumption: [],
  account: msp,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envCB: Environment = {
  id: 'env-axis-prod',
  name: 'Prod',
  consumption: [],
  account: msp,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envCC: Environment = {
  id: 'env-axis-staging',
  name: 'Staging',
  consumption: [],
  account: msp,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const group1: Grouper = {
  id: 'douglas',
  name: 'Douglas',
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const group2: Grouper = {
  id: 'lutz',
  name: 'XXL Lutz GmbH & Co KG',
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const group3: Grouper = {
  id: 'axis',
  name: 'Axis Corporate',
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const group4: Grouper = {
  id: 'saas-contract',
  name: 'SaaS Contract',
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envSaasA: Environment = {
  id: 'saas-prod',
  name: 'SaaS Prod',
  consumption: [],
  account: msp,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envSaasB: Environment = {
  id: 'saas-pre-prod',
  name: 'SaaS Pre-Prod',
  consumption: [],
  account: msp,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

group4.children = [envSaasA, envSaasB];

msp.children = [group1, clusterC, group4];
clusterC.children = [group2, group3];
group1.children = [clusterA, clusterB];
group2.children = [envCA, envCE];
group3.children = [envCB, envCC];
clusterA.children = [envAA, envAB];
clusterB.children = [envBA, envBB];

export const mspGrants: Grant[] = [
  {
    from: Date.UTC(2022, 0, 1),
    to: Date.UTC(2022, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.HUH,
    amount: 500_000,
    remainingAmount: 500_000,
    id: 'MSP-001.1-01',
    nodeId: 'douglas',
  },
  {
    from: Date.UTC(2022, 0, 1),
    to: Date.UTC(2022, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DEM,
    amount: 100_000_000,
    remainingAmount: 100_000_000,
    id: 'MSP-001.1.1-01',
    nodeId: 'douglas',
  },
  {
    from: Date.UTC(2021, 7, 1),
    to: Date.UTC(2022, 6, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.ASU,
    amount: 10_000_000,
    remainingAmount: 10_000_000,
    id: 'MSP-003-01',
    nodeId: 'axis',
  },
  {
    from: Date.UTC(2021, 7, 1),
    to: Date.UTC(2022, 6, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DEM,
    amount: 20_000_000,
    remainingAmount: 20_000_000,
    id: 'MSP-003-01',
    nodeId: 'axis',
  },
  {
    from: Date.UTC(2021, 7, 1),
    to: Date.UTC(2022, 6, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DDU,
    amount: 5_000_000,
    remainingAmount: 5_000_000,
    id: 'MSP-003-01',
    nodeId: 'axis',
  },
  {
    from: Date.UTC(2021, 7, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DDU,
    amount: 50_000_000,
    remainingAmount: 50_000_000,
    id: 'MSP-003-01',
    nodeId: 'lutz',
  },
  {
    from: Date.UTC(2021, 7, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Free,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DDU,
    amount: 83_000,
    remainingAmount: 83_000,
    id: 'MSP-003-01',
    nodeId: 'env-lutz-prod',
  },
  {
    from: Date.UTC(2021, 7, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Free,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DDU,
    amount: 83_000,
    remainingAmount: 83_000,
    id: 'MSP-003-01',
    nodeId: 'env-lutz-pre-prod',
  },
  {
    from: Date.UTC(2022, 0, 1),
    to: Date.UTC(2022, 11, 31),
    type: GrantType.Free,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DDU,
    amount: 200_000,
    remainingAmount: 200_000,
    id: 'MSP-003-01',
    nodeId: 'env-lutz-prod',
  },
  {
    from: Date.UTC(2022, 0, 1),
    to: Date.UTC(2022, 11, 31),
    type: GrantType.Free,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DDU,
    amount: 200_000,
    remainingAmount: 200_000,
    id: 'MSP-003-01',
    nodeId: 'env-lutz-pre-prod',
  },
  {
    from: Date.UTC(2022, 0, 1),
    to: Date.UTC(2022, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DDU,
    amount: 120_000_000,
    remainingAmount: 120_000_000,
    id: 'MSP-003-01',
    nodeId: 'lutz',
  },
  {
    from: Date.UTC(2022, 0, 1),
    to: Date.UTC(2022, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.ASU,
    amount: 5_000_000,
    remainingAmount: 5_000_000,
    id: 'MSP-003-01',
    nodeId: 'saas-contract',
  },
];

export const mspAllocs: AllocItem[] = [
  {
    from: Date.UTC(2020, 0, 1),
    to: Date.UTC(2030, 11, 31),
    type: AllocRestriction.Limit,

    consumption: [],
    sku: SKU.DEM,
    amount: 5_000_000,
    remaining: 5_000_000,
    id: 'MSP-003-01',
    nodeId: 'cluster-msp-a',
  },
  {
    from: Date.UTC(2020, 0, 1),
    to: Date.UTC(2030, 11, 31),
    type: AllocRestriction.Limit,

    consumption: [],
    sku: SKU.HUH,
    amount: 100_000,
    remaining: 100_000,
    id: 'MSP-003-01',
    nodeId: 'cluster-msp-a',
  },
  {
    from: Date.UTC(2020, 0, 1),
    to: Date.UTC(2030, 11, 31),
    type: AllocRestriction.Limit,

    consumption: [],
    sku: SKU.ASU,
    amount: 750_000,
    remaining: 750_000,
    id: 'MSP-003-01',
    nodeId: 'saas-pre-prod',
  },
];
