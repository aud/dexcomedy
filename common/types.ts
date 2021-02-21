export interface Alerting {
  enabled: boolean;
  lowThreshold?: number;
  highThreshold?: number;
}

export interface Weather {
  enabled: boolean;
  unit?: 'C' | 'F';
  temperature?: number;
}

export interface Gloucose {
  unit: 'mgdl' | 'mmol';
  value: number;
  lastUpdatedSec: number;
  // https://s3-us-west-2.amazonaws.com/dexcompdf/HCP_Website/LBL014261+G5+NA+advanced+treatment+decisions.pdf
  trend: 'double-up' | 'up' | 'half-up' | 'steady' | 'half-down' | 'down' | 'double-down' | 'unknown';
}

export interface Clock {
  format: '24' | '12';
}

// 12 to 24 hours customize
export interface Payload {
  alerting: Alerting;
  weather: Weather;
  gloucose: Gloucose;
  clock: Clock;
  type: 'refresh' | 'update';
}

export interface StorageItemType {
  type: 'toggle' | 'input' | 'select';
}
