import {HeartRateSensor} from 'heart-rate';
import {display} from 'display';
import {today} from 'user-activity';
import {battery as fitbitBattery} from 'power';
import {clock as fitbitClock} from 'clock';

const CALLBACK_BUFFER = 3000; // 3s

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
    interval = setInterval(() => callback(today.adjusted.steps), CALLBACK_BUFFER);
  };
  const stop = () => clearInterval(interval);

  display.addEventListener('change', () => {
    display.on ? start() : stop();
  });

  start();
}

export function clock(callback) {
  fitbitClock.granularity = 'seconds';

  const withZeroPad = val => ('0' + val).slice(-2);

  fitbitClock.ontick = evt => {
    const hours   = (evt.date.getHours() + 24) % 12 || 12;
    const minutes = withZeroPad(evt.date.getMinutes());

    callback(`${hours}:${minutes}`);
  };
}

export function battery(callback) {
  const percentageColour = percentage => {
    if (percentage <= 10) {
        return 'fb-red';
    } else if (percentage <= 40) {
        return 'fb-peach';
    } else if (percentage <= 70) {
        return 'fb-mint';
    } else {
        return 'fb-green';
    }
  };

  const percentageCalculatedWidth = percentage =>
    percentage * 30 / 100;

  let interval;

  const start = () => {
    interval = setInterval(() => {
      const chargeLevel = fitbitBattery.chargeLevel;

      callback({
        colour: percentageColour(chargeLevel),
        calculatedWidth: percentageCalculatedWidth(chargeLevel),
      });
    }, CALLBACK_BUFFER);
  };

  const stop = () => clearInterval(interval);

  display.addEventListener('change', () => {
    display.on ? start() : stop();
  });

  start();
}
