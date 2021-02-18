import {fetchWeather} from './weather';
import {coordinates} from './geolocation';
import {getOpenWeatherMapApiKey} from './store';

const result = getOpenWeatherMapApiKey()
console.error(result)
// (async () => {
//   const {latitude, longitude} = await coordinates();
//   const {city, temperature} = await fetchWeather({latitude, longitude})

//   console.error("city: ", city);
//   console.error("temp: ", temperature);
// })()
