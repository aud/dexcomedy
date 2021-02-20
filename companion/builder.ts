import {Payload, Weather, Alerting, Gloucose, Clock} from '../common/types';
import {fetchWeather} from './weather';
import {coordinates} from './geolocation';
import {fetchDexcomData} from './dexcom';
import {mgdlToMmol} from '../common/utilities';
import {
  getWeatherEnabled,
  getWeatherUnit,
  getDexcomUnit,
  getClockFormat,
  getAlertingEnabled,
  getAlertingLowThreshold,
  getAlertingHighThreshold,
} from './store';

export const buildWeather = async (): Promise<Weather> => {
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

export const buildAlerting = (): Alerting => {
  if (getAlertingEnabled()) {
    return {
      enabled: true,
      lowThreshold: getAlertingLowThreshold(),
      highThreshold: getAlertingHighThreshold(),
    }
  } else {
    return {
      enabled: false,
    }
  }
}

export const buildGloucose = async (): Promise<Gloucose> => {
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

export const buildClock = (): Clock => {
  return {
    format: getClockFormat(),
  }
}
