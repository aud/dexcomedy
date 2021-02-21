import {Payload, Weather, Alerting, Gloucose} from '../common/types';
import {fetchWeather} from './weather';
import {coordinates} from './geolocation';
import {fetchDexcomData} from './dexcom';
import {mgdlToMmol, kelvinToCelcius, kelvinToFahrenheit} from '../common/utilities';
import {
  getWeatherEnabled,
  getWeatherUnit,
  getDexcomUnit,
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

    const unit = getWeatherUnit();

    const temperature = unit === "C"
     ? kelvinToCelcius(result.payload.temperature)
     : kelvinToFahrenheit(result.payload.temperature);

    return {
      enabled: true,
      temperature: Math.round(temperature),
      unit,
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
