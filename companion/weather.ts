import {getOpenWeatherMapApiKey} from './store';
import {Result} from '../common/result';

interface Coords {
  latitude: string;
  longitude: string;
}

export async function fetchWeather({latitude, longitude}: Coords): Promise<Result> {
  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${getOpenWeatherMapApiKey()}`,
    );

    const json = await result.json();

    if (result.status !== 200) {
      throw new Error(`openweathermap responded with ${result.status}`);
    }

    return Result.success({temperature: json.main.temp});
  } catch (err) {
    return Result.failure(err);
  }
}
