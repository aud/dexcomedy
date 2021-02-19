import asap from "fitbit-asap/companion"
import {Payload, Weather, Alerting, Gloucose} from '../common/types';
import {fetchWeather} from './weather';
import {coordinates} from './geolocation';
import {fetchDexcomData} from './dexcom';
import {getWeatherEnabled, getWeatherUnit} from './store';

const buildWeather = async (): Promise<Weather> => {
  if (getWeatherEnabled()) {
    const {latitude, longitude} = await coordinates();
    const {temperature} = await fetchWeather({latitude, longitude});

    return {
      enabled: true,
      unit: getWeatherUnit(),
      temperature,
    }
  } else {
    return {
      enabled: false,
    }
  }
}

const buildAlerting = (): Alerting => {
  return {
    enabled: false,
  }
}

const buildGloucose = async (): Promise<any> => {
  const result = await fetchDexcomData()

  console.error("REWTF", result.payload)

  // return {
  //   unit: "mgdl",
  //   lastUpdatedMs: lastUpdated,
  //   value,
  //   trend,
  // }
}

(async () => {
  // Cancels all queued messages. It's recommended to call this function on
  // startup to limit messages to a single session.
  asap.cancel();

  asap.send({
    weather: await buildWeather(),
    alerting: buildAlerting(),
    gloucose: buildGloucose(),
  });
})();
