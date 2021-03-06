import {vibration} from 'haptics';

// https://dev.fitbit.com/build/reference/device-api/haptics/
const MAX_VIBRATION = 'nudge-max';
const VIBRATION_INTERVAL = 2000; // 2s

const HIGH_ALERT_TYPE = 'High';
const LOW_ALERT_TYPE = 'Low';

let lowDismissed = false;
let highDismissed = false;

let interval;
export function startAlert({type}) {
  if (highDismissed && type === LOW_ALERT_TYPE) {
    highDismissed = false;
  }

  if (lowDismissed && type === HIGH_ALERT_TYPE) {
    lowDismissed = false;
  }

  interval = setInterval(() => vibration.start(MAX_VIBRATION), VIBRATION_INTERVAL);
  return interval;
}

export function highPrevDismissed() {
  return highDismissed;
}

export function lowPrevDismissed() {
  return lowDismissed;
}

export function stopAlert({type}) {
  if (interval) {
    if (type === HIGH_ALERT_TYPE) highDismissed = true;
    if (type === LOW_ALERT_TYPE) lowDismissed = true;

    return clearInterval(interval);
  } else {
    throw new Error('Interval not yet set');
  }
}

export function lowMmolLevelDetected({mmol, lowThreshold}) {
  return mmol <= lowThreshold;
}

export function highMmolLevelDetected({mmol, highThreshold}) {
  return mmol >= highThreshold;
}
