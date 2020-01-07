import {HeartRateSensor} from 'heart-rate';
import {display} from 'display';
import {today} from "user-activity";

const STEP_CALLBACK_BUFFER = 3000; // 1s

// https://dev.fitbit.com/build/guides/sensors/heart-rate/
export function hrm(callback) {
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

export function steps(callback) {
  let interval;

  const start = () => {
    interval = setInterval(() => callback(today.adjusted.steps), STEP_CALLBACK_BUFFER);
  };
  const stop = () => clearInterval(interval);

  display.addEventListener('change', () => {
    display.on ? start() : stop();
  });

  start();
}
