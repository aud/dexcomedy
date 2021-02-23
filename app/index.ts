import document from "document";
import asap from "fitbit-asap/app"
import {Payload, Gloucose, Weather, Clock} from "../common/types";
import {normalizedLastUpdatedTime, normalizedDate} from "../common/utilities";
import {me} from "appbit";
import {clock} from "./clock";
import {hrm} from "./hrm";
import {steps} from "./steps";

// "alerting":{"enabled":true,"lowThreshold":"4.4","highThreshold":"12.3"},
// "weather":{"enabled":true,"unit":"fahrenheit","temperature":275.48}},
// "gloucose":{"lastUpdatedSec":301,"trend":"steady","value":14.3,"unit":"mmol"},
// "clock":{"format":"12"},

const TICK_UPDATE_CALLBACK_BUFFER = 1000; // 1s
const STALE_DATA_BUFFER = 600; // 10m

let tickerInterval;

const getChildElementById = id => {
  return document.getElementById(id).firstChild;
}

const drawGloucose = (gloucose: Gloucose) => {
  const gloucoseElm = document.getElementById('Gloucose');
  const lastUpdatedElm = document.getElementById('GloucoseLastUpdated');

  gloucoseElm.text = gloucose.value.toString();
  lastUpdatedElm.text = normalizedLastUpdatedTime(gloucose.lastUpdatedSec);

  // Artifical ticker
  let ticker = gloucose.lastUpdatedSec;

  const tickUpdateCallback = () => {
    ticker += 1;
    lastUpdatedElm.text = normalizedLastUpdatedTime(ticker);

    // Don't show stale data if last known update buffer exceeded
    if (ticker >= STALE_DATA_BUFFER) {
      gloucoseElm.text = '-';
    }
  };

  // Teardown and re-setup interval to avoid concurrent updates
  if (tickerInterval) clearInterval(tickerInterval);
  tickerInterval = setInterval(tickUpdateCallback, TICK_UPDATE_CALLBACK_BUFFER);
}

const drawWeather = (weather: Weather) => {
  const weatherElm = getChildElementById('Weather');

  if (weather.enabled) {
    const DEGREE_HTML_CODE = "&#176;"

    weatherElm.text = weather.temperature.toString()
      + DEGREE_HTML_CODE
      + " "
      + weather.unit;
  } else {
    // Hide from DOM
    // (weatherElm as any).style.display = "none";
  }
}

const drawClock = () => {
  const clockElm = document.getElementById('Clock');

  clock(time => clockElm.text = time);
}

const drawHrm = () => {
  const hrmElm = getChildElementById("HeartRate");
  hrm(hr => hrmElm.text = hr);
}

const drawSteps = () => {
  const stepsElm = getChildElementById("Steps");
  steps(count => stepsElm.text = count);
}

const drawDate = () => {
  const dateElm = getChildElementById("Date");
  dateElm.text = normalizedDate();
}

const updateHandler = ({alerting, weather, gloucose}: Payload) => {
  console.error(JSON.stringify(alerting))
  console.error(JSON.stringify(weather))
  console.error(JSON.stringify(gloucose))

  drawClock();
  drawDate();
  drawSteps();
  drawHrm();
  drawGloucose(gloucose);
  drawWeather(weather);

  // if (alerting.enabled) {
  //   drawAlerting();
  // }

  // drawGloucose();
  // drawClock();
  // drawHeartRate();
  // drawDate();
  // drawSteps();
}


const refreshHandler = () => {
  me.exit();
}

const newMessageHandler = props => {
  switch(props.type) {
    case "refresh":
      refreshHandler();
      break;
    case "update":
      updateHandler(props)
      break;
  }
}

asap.onmessage = newMessageHandler;
