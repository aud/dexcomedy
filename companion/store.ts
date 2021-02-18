import {settingsStorage} from "settings";
import {STORAGE_KEYS} from "../common/config"

export function getOpenWeatherMapApiKey() {
  return deserializedContents(STORAGE_KEYS.OPEN_WEATHER_MAP_API_KEY);
}

// Fitbit injects the values into `name` key
function deserializedContents(key) {
  return JSON.parse(settingsStorage.getItem(key) || "{}").name;
}
