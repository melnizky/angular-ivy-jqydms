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

export const sap: DynatraceAccount = {
  id: 'account-sap',
  name: 'SAP',
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const clusterA: Cluster = {
  id: 'cluster-sap-a',
  name: 'Cluster SAP A',
  account: sap,
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const clusterB: Cluster = {
  id: 'cluster-sap-b',
  name: 'Cluster SAP B',
  account: sap,
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const clusterC: Cluster = {
  id: 'cluster-sap-c',
  name: 'Cluster SAP C',
  account: sap,
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envAA: Environment = {
  id: 'env-douglas-dev',
  name: 'Douglas Dev',
  consumption: [],
  account: sap,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envAB: Environment = {
  id: 'env-douglas-uat',
  name: 'Douglas UAT',
  consumption: [],
  account: sap,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envBA: Environment = {
  id: 'env-douglas-prod-1',
  name: 'Douglas Prod 1',
  consumption: [],
  account: sap,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envBB: Environment = {
  id: 'env-douglas-prod-2',
  name: 'Douglas Prod 2',
  consumption: [],
  account: sap,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envCA: Environment = {
  id: 'env-lutz-prod',
  name: 'Prod',
  consumption: [],
  account: sap,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envCE: Environment = {
  id: 'env-lutz-pre-prod',
  name: 'Pre-Prod',
  consumption: [],
  account: sap,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envCB: Environment = {
  id: 'env-axis-prod',
  name: 'Prod',
  consumption: [],
  account: sap,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envCC: Environment = {
  id: 'env-axis-staging',
  name: 'Staging',
  consumption: [],
  account: sap,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const keptnCD: Keptn = {
  id: 'keptn-axis',
  name: 'Keptn',
  consumption: [],
  account: sap,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: {
    ...featuresDisabledTemplate,
    CloudAutomationFt1: true,
  },
};

const deusCF: DEUS = {
  id: 'deus-axis',
  name: 'Axis DEUS',
  consumption: [],
  account: sap,
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: {
    ...featuresDisabledTemplate,
    DeusComputationFt1: true,
    Logs: true,
  },
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

sap.children = [group1, clusterC];
clusterC.children = [group2, group3];
group1.children = [clusterA, clusterB];
group2.children = [envCA, envCE];
group3.children = [envCB, envCC, keptnCD, deusCF];
clusterA.children = [envAA, envAB];
clusterB.children = [envBA, envBB];

export const sapAllocations: Grant[] = [
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.HUH,
    amount: 500_000,
    remainingAmount: 500_000,
    id: 'sap-001.1-01',
    nodeId: 'douglas',
  },
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DEM,
    amount: 100_000_000,
    remainingAmount: 100_000_000,
    id: 'sap-001.1.1-01',
    nodeId: 'douglas',
  },
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.HUH,
    amount: 75_000,
    remainingAmount: 75_000,
    id: 'sap-001.1.1-01',
    nodeId: 'cluster-sap-a',
  },
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DEM,
    amount: 5_000_000,
    remainingAmount: 5_000_000,
    id: 'sap-001.1.1-01',
    nodeId: 'cluster-sap-a',
  },
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.HUH,
    amount: 1_000_000,
    remainingAmount: 1_000_000,
    id: 'sap-001-01',
    nodeId: 'account-sap',
  },
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DEM,
    amount: 500_000_000,
    remainingAmount: 500_000_000,
    id: 'sap-001-02',
    nodeId: 'account-sap',
  },
  {
    from: Date.UTC(2021, 9, 1),
    to: Date.UTC(2022, 2, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DEM,
    amount: 300_000_000,
    remainingAmount: 300_000_000,
    id: 'sap-001-02',
    nodeId: 'account-sap',
  },
  {
    from: Date.UTC(2021, 0, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Free,
    canBeSplit: true,

    priority: 1,
    consumption: [],
    sku: SKU.DDU,
    amount: 200_000,
    remainingAmount: 200_000,
    id: 'sap-001-03',
    nodeId: 'account-sap',
  },
  {
    from: Date.UTC(2021, 3, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DDU,
    amount: 500_000_000,
    remainingAmount: 500_000_000,
    id: 'sap-002-01',
    nodeId: 'account-sap',
  },
  {
    from: Date.UTC(2021, 6, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Overage,
    canBeSplit: true,

    priority: 10,
    consumption: [],
    sku: SKU.DDU,
    amount: 50_000_000,
    remainingAmount: 50_000_000,
    id: 'sap-002-01',
    nodeId: 'account-sap',
  },
  {
    from: Date.UTC(2021, 7, 1),
    to: Date.UTC(2021, 11, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.CAU,
    amount: 30_000_000,
    remainingAmount: 30_000_000,
    id: 'sap-003-01',
    nodeId: 'account-sap',
  },
  {
    from: Date.UTC(2021, 9, 1),
    to: Date.UTC(2022, 8, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.DCU,
    amount: 10_000_000,
    remainingAmount: 10_000_000,
    id: 'sap-003-01',
    nodeId: 'account-sap',
  },
  {
    from: Date.UTC(2021, 7, 1),
    to: Date.UTC(2022, 6, 31),
    type: GrantType.Paid,
    canBeSplit: true,

    priority: 2,
    consumption: [],
    sku: SKU.CAU,
    amount: 10_000_000,
    remainingAmount: 10_000_000,
    id: 'sap-003-01',
    nodeId: 'axis',
  },
];
