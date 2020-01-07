import asap from "fitbit-asap/app"
import document from "document";
import {hrm, steps} from './default-stats';

const getChildElementById = id => {
  return document.getElementById(id).firstChild;
}

const registerStatsCallbacks = () => {
  // Heart rate
  const hrmElm = getChildElementById('HeartRate');
  hrm(hr => hrmElm.text = hr);

  // Steps
  const stepsElm = getChildElementById('Steps');
  steps(count => stepsElm.text = count);
}

const registerDexcomCallbacks = () => {
  asap.onmessage = ({mmol, trend, lastUpdated}) => {
    console.error(mmol, trend, lastUpdated)
    const hrmElm = getChildElementById('Mmol');
    hrmElm.text = mmol;
  }
};

// Main
(() => {
  // Clear queued messages
  asap.cancel();

  // Register callbacks
  registerStatsCallbacks();
  registerDexcomCallbacks();
})();
