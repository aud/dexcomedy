import {vibration} from 'haptics';

// https://dev.fitbit.com/build/reference/device-api/haptics/
const MAX_VIBRATION = 'nudge-max';
const VIBRATION_INTERVAL = 2000; // 2s

// TODO: Extract to configurable settings
const LOW_GLOUCOSE_THRESHOLD = 4.4;
const HIGH_GLOUCOSE_THRESHOLD = 11.1;

let interval;
export function startAlert() {
  interval = setInterval(() => vibration.start(MAX_VIBRATION), VIBRATION_INTERVAL);
  return interval;
}

export function stopAlert() {
  if (interval) {
    return clearInterval(interval);
  } else {
    throw new Error('Interval not yet set');
  }
}

export function lowMmolLevelDetected(mmol) {
  return mmol <= LOW_GLOUCOSE_THRESHOLD;
}

export function highMmolLevelDetected(mmol) {
  return mmol >= HIGH_GLOUCOSE_THRESHOLD;
}
