import {getOpenWeatherMapApiKey} from './store';

interface Coords {
  latitude: string;
  longitude: string;
}

export async function fetchWeather({latitude, longitude}: Coords) {
  console.error("test", getOpenWeatherMapApiKey())
  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${getOpenWeatherMapApiKey()}`,
  );

  const {
    name: city,
    main: {
      temp: temperature,
    }
  } = await result.json();

  return {city, temperature};
}
