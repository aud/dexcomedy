import asap from "fitbit-asap/app"
import document from "document";
import {normalizedDate, normalizedLastUpdatedTime} from '../common/utilities';
import {hrm, steps, clock, battery} from './default-stats';
import {
  startAlert,
  stopAlert,
  lowMmolLevelDetected,
  highMmolLevelDetected,
  lowPrevDismissed,
  highPrevDismissed,
} from './notifications';

const TICK_UPDATE_CALLBACK_BUFFER = 1000; // 1s
const STALE_DATA_BUFFER           = 600; // 10m

const getChildElementById = id => {
  return document.getElementById(id).firstChild;
}

const createAlertPrompt = ({type, mmol}) => {
  const mainElm = document.getElementById('Main')
  const alertElm = document.getElementById('Alert');
  const muteButtonElm = alertElm.getElementById('MuteButton');
  const mmolLevelElm = alertElm.getElementById('MmolLevel');
  const detectedHeaderElm = alertElm.getElementById('DetectedHeader');

  const showMainDisplay = () => mainElm.style.display = 'inline';
  const hideMainDisplay = () => mainElm.style.display = 'none';
  const showAlertDisplay = () => alertElm.style.display = 'inline';
  const hideAlertDisplay = () => alertElm.style.display = 'none';

  // Show alert
  mmolLevelElm.text = mmol
  detectedHeaderElm.text = type + ' detected';
  startAlert({type});
  hideMainDisplay();
  showAlertDisplay();

  muteButtonElm.onclick = _evt => {
    stopAlert({type});

    hideAlertDisplay();
    showMainDisplay();
  }
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
  let interval;
  const lazySetInterval = func => {
    interval = setInterval(func, TICK_UPDATE_CALLBACK_BUFFER);
  }

  asap.onmessage = ({
    mmol,
    trend,
    lastUpdated,
    lowThreshold,
    highThreshold
  }) => {
    const mmolElm            = document.getElementById('Mmol');
    const mmolLastUpdatedElm = document.getElementById('MmolLastUpdated');
    const mmolTrendArrowElm  = document.getElementById('ArrowIcon');

    mmolElm.text            = mmol;
    mmolTrendArrowElm.href  = `images/${trend}.png`;
    mmolLastUpdatedElm.text = normalizedLastUpdatedTime(lastUpdated);

    // Create an artificial ticker
    let lastUpdatedTicker = lastUpdated;

    const tickUpdateCallback = () => {
      // If last updated buffer has exceeded, show dash instead of potentially
      // outdated data.
      if (lastUpdatedTicker >= STALE_DATA_BUFFER) {
        mmolElm.text = '-';
      }

      lastUpdatedTicker += 1;
      mmolLastUpdatedElm.text = normalizedLastUpdatedTime(lastUpdatedTicker);
    };

    // Teardown and re-setup interval to avoid concurrent updates
    if (interval) clearInterval(interval)
    lazySetInterval(tickUpdateCallback);

    // Alerting
    if (lowMmolLevelDetected({mmol, lowThreshold})) {
      if (lowPrevDismissed()) return;

      createAlertPrompt({type: 'Low', mmol});
    } else if (highMmolLevelDetected({mmol, highThreshold})) {
      if (highPrevDismissed()) return;

      createAlertPrompt({type: 'High', mmol});
    }
  }
}

// Main
(() => {
  // Clear queued messages
  asap.cancel();
  registerStatsCallbacks();
})();
