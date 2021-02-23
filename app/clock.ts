import fitbitClock from 'clock';
import {preferences} from "user-settings";

const withZeroPad = val => ('0' + val).slice(-2);

export const clock = (callback: Function) => {
  fitbitClock.granularity = 'seconds';

  return fitbitClock.ontick = evt => {
    let hours = evt.date.getHours();

    if (preferences.clockDisplay === "12h") {
      hours = (hours + 24) % 12 || 12;
    }

    const minutes = withZeroPad(evt.date.getMinutes());

    callback(`${hours}:${minutes}`);
  };
}
