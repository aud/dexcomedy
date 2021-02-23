import {HeartRateSensor} from 'heart-rate';
import {display} from 'display';

// https://dev.fitbit.com/build/guides/sensors/heart-rate/
export function hrm(callback) {
  // @ts-ignore
  const hrm = new HeartRateSensor({frequency: 1});

  hrm.addEventListener('reading', () => {
    callback(hrm.heartRate);
  });

  // Only track hrm when display is on
  display.addEventListener('change', () => {
    display.on ? hrm.start() : hrm.stop();
  });

  hrm.start();
}
