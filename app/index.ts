import document from "document";
import asap from "fitbit-asap/app"
import {Payload, Gloucose, Weather} from "../common/types";
import {normalizedLastUpdatedTime} from "../common/utilities";

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

  weatherElm.text = weather.temperature.toString();
}

const newMessageHandler = ({alerting, weather, gloucose, clock}: Payload) => {
  console.log("Got weather: ", JSON.stringify(weather));
  console.log("Got alerting: ", JSON.stringify(alerting));
  console.log("Got gloucose: ", JSON.stringify(gloucose));
  console.log("Got clock: ", JSON.stringify(clock));

  drawGloucose(gloucose);

  if (weather.enabled) {
    drawWeather(weather);
  }

  // if (alerting.enabled) {
  //   drawAlerting();
  // }

  // drawGloucose();
  // drawClock();
  // drawHeartRate();
  // drawDate();
  // drawSteps();

}

asap.onmessage = newMessageHandler;
