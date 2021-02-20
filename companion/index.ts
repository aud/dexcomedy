import asap from "fitbit-asap/companion"
import {Payload, Weather, Alerting, Gloucose, Clock} from '../common/types';
import {fetchWeather} from './weather';
import {coordinates} from './geolocation';
import {fetchDexcomData} from './dexcom';
import {mgdlToMmol} from '../common/utilities';
import {getWeatherEnabled, getWeatherUnit, getDexcomUnit, getClockFormat} from './store';

const buildWeather = async (): Promise<Weather> => {
  if (getWeatherEnabled()) {
    const {latitude, longitude} = await coordinates();
    const result = await fetchWeather({latitude, longitude});

    // Future Bugsnag notify?
    if (result.error) {
      throw new Error(result.error);
    }

    return {
      enabled: true,
      unit: getWeatherUnit(),
      temperature: result.payload.temperature,
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

const buildGloucose = async (): Promise<Gloucose> => {
  const result = await fetchDexcomData()

  // Future Bugsnag notify?
  if (result.error) {
    throw new Error(result.error);
  }

  // The default value from Dexcom is mg/dL
  const unit = getDexcomUnit();
  const value = unit === "mmol"
    ? mgdlToMmol(result.payload.value)
    : result.payload.value;

  return {
    lastUpdatedSec: result.payload.lastUpdatedSec,
    trend: result.payload.trend,
    value,
    unit,
  }
}

const buildClock = (): Clock => {
  return {
    format: getClockFormat(),
  }
}

(async () => {
  // Cancels all queued messages. It's recommended to call this function on
  // startup to limit messages to a single session.
  asap.cancel();

  asap.send({
    alerting: buildAlerting(),
    clock: buildClock(),
    gloucose: await buildGloucose(),
    weather: await buildWeather(),
  });
})();
