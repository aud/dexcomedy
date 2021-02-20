import {settingsStorage} from "settings";
import {STORAGE_KEYS} from "../common/config"

export function getOpenWeatherMapApiKey() {
  return deserializedContents(STORAGE_KEYS.WEATHER.API_KEY).name;
}

export function getWeatherEnabled() {
  return deserializedContents(STORAGE_KEYS.WEATHER.ENABLED);
}

export function getWeatherUnit() {
  return deserializedContents(STORAGE_KEYS.WEATHER.UNIT).values[0].name;
}

export function getDexcomUsername() {
  return deserializedContents(STORAGE_KEYS.DEXCOM.USERNAME).name;
}

export function getDexcomPassword() {
  return deserializedContents(STORAGE_KEYS.DEXCOM.PASSWORD).name;
}

export function getDexcomUnit() {
  return deserializedContents(STORAGE_KEYS.DEXCOM.UNIT).values[0].name;
}

export function getClockFormat() {
  return deserializedContents(STORAGE_KEYS.CLOCK.FORMAT).values[0].name;
}

function deserializedContents(key) {
  return JSON.parse(settingsStorage.getItem(key) || "{}");
}
