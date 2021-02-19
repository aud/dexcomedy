export interface Alerting {
  enabled: boolean;
  lowThreshold?: number;
  highThreshold?: number;
}

export interface Weather {
  enabled: boolean;
  unit?: 'celcius' | 'fahrenheit';
  temperature?: number;
}

export interface Gloucose {
  unit: 'mgdl' | 'mmol';
  value: number;
  lastUpdatedMs: number;
  // https://s3-us-west-2.amazonaws.com/dexcompdf/HCP_Website/LBL014261+G5+NA+advanced+treatment+decisions.pdf
  trend: 'double-up' | 'up' | 'half-up' | 'steady' | 'half-down' | 'down' | 'double-down' | 'unknown';
}

// 12 to 24 hours customize
export interface Payload {
  alerting: Alerting;
  weather: Weather;
  gloucose: Gloucose;
}
