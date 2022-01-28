import {
  GrantType,
  DynatraceAccount,
  Environment,
  featuresDisabledTemplate,
  featuresEnabledTemplate,
  SKU,
  Grant,
  AllocItem,
  Contract,
} from '../../models';

export const saasAccount: DynatraceAccount = {
  id: 'account-saas',
  name: 'Classic SaaS',
  consumption: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envA: Environment = {
  id: 'cxs95594',
  name: 'PROD - cxs95594',
  account: saasAccount,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envB: Environment = {
  id: 'inh77359',
  name: 'Sandbox - inh77359',
  account: saasAccount,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

const envC: Environment = {
  id: 'elf55360',
  name: 'NONPROD elf55360',
  account: saasAccount,
  consumption: [],
  children: [],
  features: { ...featuresDisabledTemplate },
  manualSettingsForFeatures: { ...featuresEnabledTemplate },
};

saasAccount.children = [envA, envB, envC];

export const saasGrants: Grant[] = [
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
    nodeId: 'account-saas',
    canBeSplit: true,
    contractId: '2',
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
    nodeId: 'account-saas',
    canBeSplit: true,
    contractId: '2',
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
    nodeId: 'account-saas',
    canBeSplit: true,
    contractId: '2',
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
    nodeId: 'cxs95594',
    canBeSplit: false,
    contractId: '2',
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
    nodeId: 'inh77359',
    canBeSplit: false,
    contractId: '2',
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
    nodeId: 'elf55360',
    canBeSplit: false,
    contractId: '2',
  },
];

export const saasAllocs: AllocItem[] = [];
