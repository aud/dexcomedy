import {getOpenWeatherMapApiKey} from './store';

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

    return {temperature};
  } catch (err) {
    console.error("error: ", JSON.stringify(err));
    return {temperature: undefined}
  }
}
