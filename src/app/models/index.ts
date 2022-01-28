export interface DynatraceAccount extends Node {}

export interface Environment extends Node {
  account: DynatraceAccount;
}

export interface Cluster extends Node {
  account: DynatraceAccount;
}

export interface Keptn extends Node {
  account: DynatraceAccount;
}

export interface DEUS extends Node {
  account: DynatraceAccount;
}

export interface Grouper extends Node {}

export interface Allocation {
  items: AllocItem[];
}

export interface Grant {
  id: string;
  type: GrantType;
  sku: SKU;
  amount: number;
  remainingAmount?: number;
  consumption: Consumption[];
  priority: number;
  from: number; // milli secs since Jan 1st 1970
  to: number; // milli secs since Jan 1st
  nodeId: string; // Account, Cluster, Env, keptn, ...
  canBeSplit: boolean;
  rateCard?: DpsRateCard;
  contractId?: string;
  features?: Features;
}

export interface AllocItem {
  id: string;
  type: AllocRestriction;
  sku: SKU;
  remaining: number;
  consumption: Consumption[];
  amount: number;
  from: number; // milli secs since Jan 1st 1970
  to: number; // milli secs since Jan 1st
  nodeId: string; // Account, Cluster, Env, keptn, ...
}

export enum GrantType {
  Paid = 'Paid',
  Overage = 'Overage',
  Free = 'Free',
}

export enum AllocRestriction {
  Limit = 'Limit',
  Reservation = 'Reservation',
}

export enum SKU {
  HUH = 'HUH',
  DEM = 'DEM',
  DDU = 'DDU',
  ASU = 'ASU',
  CAU = 'CAU',
  DCU = 'DCU',
  DPS = 'DPS',
}

export interface DpsRateCard {
  huhFactor: number;
  demFactor: number;
  dduFactor: number;
  asuFactor: number;
  cauFactor: number;
  dcuFactor: number;
}

export interface Consumption {
  id: string;
  amount: number;
  sku: SKU;
  from: number; // milli secs since Jan 1st 1970
  to: number; // milli secs since Jan 1st 1970
  source?: Consumption;
  ratedAmount?: number;
  ratingFactor?: number;
  feature: string;
}

export interface Node {
  id: string;
  name: string;
  children?: Node[];
  consumption: Consumption[];
  features: Features;
  manualSettingsForFeatures: Features;
}

export interface Features {
  HostMonitoring: boolean;
  WebSessions: boolean;
  MobileSessions: boolean;
  Metrics: boolean;
  Logs: boolean;
  VulnerabilityDetections: boolean;
  RASP: boolean;
  CloudAutomationFt1: boolean;
  DeusComputationFt1: boolean;
}

export const featuresDisabledTemplate: Features = {
  HostMonitoring: false,
  WebSessions: false,
  MobileSessions: false,
  Metrics: false,
  Logs: false,
  VulnerabilityDetections: false,
  RASP: false,
  CloudAutomationFt1: false,
  DeusComputationFt1: false,
};

export const featuresEnabledTemplate: Features = {
  HostMonitoring: true,
  WebSessions: true,
  MobileSessions: true,
  Metrics: true,
  Logs: true,
  VulnerabilityDetections: true,
  RASP: true,
  CloudAutomationFt1: true,
  DeusComputationFt1: true,
};

export const defaultFeaturesHuh: Features = {
  ...featuresDisabledTemplate,
  HostMonitoring: true,
};

export const defaultFeaturesDEM: Features = {
  ...featuresDisabledTemplate,
  WebSessions: true,
  MobileSessions: true,
};

export const defaultFeaturesDDU: Features = {
  ...featuresDisabledTemplate,
  Metrics: true,
  Logs: true,
};

export const defaultFeaturesASUs: Features = {
  ...featuresDisabledTemplate,
  VulnerabilityDetections: true,
  RASP: true,
};

export const defaultFeaturesCAU: Features = {
  ...featuresDisabledTemplate,
  CloudAutomationFt1: true,
};

export const defaultFeaturesDCU: Features = {
  ...featuresDisabledTemplate,
  DeusComputationFt1: true,
};

export const defaultFeaturesDPS: Features = {
  ...featuresEnabledTemplate,
  VulnerabilityDetections: false,
  RASP: false,
  CloudAutomationFt1: false,
};

export interface Contract {
  id: string;
  start: number;
  end: number;
}

export const featureToSkuMapping = {
  HostMonitoring: SKU.HUH,
  WebSessions: SKU.DEM,
  MobileSessions: SKU.DEM,
  Metrics: SKU.DDU,
  Logs: SKU.DDU,
  VulnerabilityDetections: SKU.ASU,
  RASP: SKU.ASU,
  CloudAutomationFt1: SKU.CAU,
  DeusComputationFt1: SKU.DCU,
};
