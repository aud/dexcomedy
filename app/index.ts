import document from "document";
import asap from "fitbit-asap/app"
import {Payload, Gloucose, Weather, Clock} from "../common/types";
import {normalizedLastUpdatedTime, normalizedDate, assetPathForTrend} from "../common/utilities";
import {me} from "appbit";
import {clock} from "./clock";
import {hrm} from "./hrm";
import {steps} from "./steps";

const TICK_UPDATE_CALLBACK_BUFFER = 1000; // 1s
const STALE_DATA_BUFFER = 600; // 10m

let tickerInterval;

const getChildElementById = id => {
  return document.getElementById(id).firstChild;
}

const drawGloucose = (gloucose: Gloucose) => {
  const gloucoseElm = document.getElementById('Gloucose');
  const gloucoseLastUpdatedElm = document.getElementById('GloucoseLastUpdated');
  const gloucoseTrendArrowElm = document.getElementById('GloucoseArrowIcon');

  gloucoseElm.text = gloucose.value.toString();
  gloucoseLastUpdatedElm.text = normalizedLastUpdatedTime(gloucose.lastUpdatedSec);
  (gloucoseTrendArrowElm as any).href = assetPathForTrend(gloucose.trend);

  // Artifical ticker
  let ticker = gloucose.lastUpdatedSec;

  const tickUpdateCallback = () => {
    ticker += 1;
    gloucoseLastUpdatedElm.text = normalizedLastUpdatedTime(ticker);

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
  const clockElm = getChildElementById("Clock");
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
  drawClock();
  drawDate();
  drawSteps();
  drawHrm();
  drawGloucose(gloucose);
  drawWeather(weather);
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
