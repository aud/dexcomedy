import {getOpenWeatherMapApiKey} from './store';
import {Result} from '../common/result';

interface Coords {
  latitude: string;
  longitude: string;
}

export async function fetchWeather({latitude, longitude}: Coords) {
  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${getOpenWeatherMapApiKey()}`,
    );

    const {
      main: {
        temp: temperature,
      }
    } = await result.json();

    return Result.success({temperature});
  } catch (err) {
    return Result.failure(err);
  }
}
