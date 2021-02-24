import document from "document";
import asap from "fitbit-asap/app"
import {Payload, Gloucose, Weather, Clock, Alerting} from "../common/types";
import {normalizedLastUpdatedTime, normalizedDate, assetPathForTrend} from "../common/utilities";
import {me} from "appbit";
import {clock} from "./clock";
import {hrm} from "./hrm";
import {steps} from "./steps";
import {BloodSugar} from "./bloodsugar";
import {Vibration} from "./vibration";

const TICK_UPDATE_CALLBACK_BUFFER = 1000; // 1s
const STALE_DATA_BUFFER = 600; // 10m
const STOP_VIBRATION_BUFFER = 1200; // 2m

let tickerInterval;
let alertInterval;

// Global vibration state
const vibration = new Vibration();


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

const drawWeather = (weather: Weather, column: string) => {
  const weatherElm = getChildElementById("Weather" + column);

  const DEGREE_HTML_CODE = "&#176;"

  weatherElm.text = weather.temperature.toString()
  + DEGREE_HTML_CODE
  + " "
  + weather.unit;
}

const drawClock = (column: string) => {
  const clockElm = getChildElementById("Clock" + column);
  clock(time => clockElm.text = time);
}

const drawHrm = (column: string) => {
  const hrmElm = getChildElementById("HeartRate" + column);
  hrm(hr => hrmElm.text = hr);
}

const drawSteps = (column: string) => {
  const stepsElm = getChildElementById("Steps" + column);
  steps(count => stepsElm.text = count);
}

const drawDate = (column: string) => {
  const dateElm = getChildElementById("Date" + column);
  dateElm.text = normalizedDate();
}

const drawAlerting = (gloucose: Gloucose, alerting: Alerting) => {
  const bloodSugar = new BloodSugar({
    lowThreshold: alerting.lowThreshold,
    highThreshold: alerting.highThreshold,
    currentBg: gloucose.value,
  });

  // If bloodsugar is abnormal
  //   1. Start vibration
  //   2. Show alert screen with alert you've hit a abnormal level
  //   3. Require ACK on alert screen. Automatically disable vibration after 2 minutes.
  //   4. Always visually show alert until dismissed
  if (bloodSugar.abnormal && !vibration.recentlyDismissed) {
    vibration.start();

    if (alertInterval) clearInterval(alertInterval);

    alertInterval = setInterval(() => {
      vibration.stop();
    }, 3000);
  }
}

const showAllIconsScreen = () => {
  // @ts-ignore
  document.getElementById("AllIcons").style.display = "inline";
}

const showIconsWithoutWeatherScreen = () => {
  // @ts-ignore
  document.getElementById("IconsWithoutWeather").style.display = "inline";
}

const updateHandler = ({alerting, weather, gloucose}: Payload) => {
  const fiveColumn = "-5-Column"
  const fourColumn = "-4-Column"
  let column;

  if (weather.enabled) {
    showAllIconsScreen();

    column = fiveColumn;

    drawWeather(weather, column)
  } else {
    showIconsWithoutWeatherScreen();

    column = fourColumn;
  }

  drawAlerting(gloucose, alerting);
  drawGloucose(gloucose);
  drawClock(column);
  drawDate(column);
  drawSteps(column);
  drawHrm(column);
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
