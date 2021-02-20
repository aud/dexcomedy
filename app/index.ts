import document from "document";
import asap from "fitbit-asap/app"
import {Payload} from '../common/types;
// import {me} from "appbit";

const data = document.getElementById("Mmol")

// "alerting":{"enabled":true,"lowThreshold":"4.4","highThreshold":"12.3"},
// "weather":{"enabled":true,"unit":"fahrenheit","temperature":275.48}},
// "gloucose":{"lastUpdatedSec":301,"trend":"steady","value":14.3,"unit":"mmol"},
// "clock":{"format":"12"},

const drawGloucose(gloucose) {
}

asap.onmessage = ({alerting, weather, gloucose, clock}: Payload) => {
  console.log("Got weather: ", JSON.stringify(weather));
  console.log("Got alerting: ", JSON.stringify(alerting));
  console.log("Got gloucose: ", JSON.stringify(gloucose));
  console.log("Got clock: ", JSON.stringify(clock));

  // if (weather.enabled) {
  //   drawWeather();
  // }

  // if (alerting.enabled) {
  //   drawAlerting();
  // }

  // drawGloucose();
  // drawClock();
  // drawHeartRate();
  // drawDate();
  // drawSteps();
}


// console.error(data)
// setTimeout(() => {
//   console.error("exiting");
//   me.exit();
// }, 2000);
