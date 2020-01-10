import asap from "fitbit-asap/app"
import document from "document";
import {normalizedDate, normalizedLastUpdatedTime} from '../common/utilities';
import {hrm, steps, clock, battery} from './default-stats';

const TICK_UPDATE_CALLBACK_BUFFER = 1000; // 1s

const getChildElementById = id => {
  return document.getElementById(id).firstChild;
}

const registerStatsCallbacks = () => {
  // Clock
  const clockElm   = getChildElementById('Clock');
  clock(time => clockElm.text = time);

  // Heart rate
  const hrmElm = getChildElementById('HeartRate');
  hrm(hr => hrmElm.text = hr);

  // Steps
  const stepsElm = getChildElementById('Steps');
  steps(count => stepsElm.text = count);

  // Date
  const dateElm = getChildElementById('Date');
  dateElm.text = normalizedDate();

  // Mmol
  asap.onmessage = ({mmol, trendAsset, lastUpdated}) => {
    const mmolElm            = document.getElementById('Mmol');
    const mmolLastUpdatedElm = document.getElementById('MmolLastUpdated');
    const mmolTrendArrowElm = document.getElementById('ArrowIcon');

    mmolElm.text = mmol;
    mmolTrendArrowElm.href = trendAsset;
    mmolLastUpdatedElm.text = normalizedLastUpdatedTime(lastUpdated);

    // Create an artifical ticker
    let interval;
    let lastUpdatedTicker = lastUpdated;

    const tickUpdateCallback = () => {
      lastUpdatedTicker += 1;
      mmolLastUpdatedElm.text = normalizedLastUpdatedTime(lastUpdatedTicker);
    };

    // Teardown and re-setup interval to avoid concurrent updates
    if (interval) clearInterval(interval)
    interval = setInterval(tickUpdateCallback, TICK_UPDATE_CALLBACK_BUFFER)
  }

  // Battery
  // const batteryElm = document.getElementById('BatteryLevel');

  // battery(({colour, calculatedWidth}) => {
  //   batteryElm.width = calculatedWidth
  //   batteryElm.style.fill = colour;
  // });
}

// Main
(() => {
  // Clear queued messages
  asap.cancel();
  registerStatsCallbacks();
})();
