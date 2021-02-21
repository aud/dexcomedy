import {settingsStorage} from "settings";
import {StorageItemType} from "../common/types"
import {STORAGE_KEYS} from "../common/config"

export function getOpenWeatherMapApiKey() {
  return deserializedContents(STORAGE_KEYS.WEATHER.API_KEY, {type: "input"});
}

export function getWeatherEnabled() {
  return deserializedContents(STORAGE_KEYS.WEATHER.ENABLED, {type: "toggle"});
}

export function getWeatherUnit() {
  return deserializedContents(STORAGE_KEYS.WEATHER.UNIT, {type: "select"});
}

export function getDexcomUsername() {
  return deserializedContents(STORAGE_KEYS.DEXCOM.USERNAME, {type: "input"});
}

export function getDexcomPassword() {
  return deserializedContents(STORAGE_KEYS.DEXCOM.PASSWORD, {type: "input"});
}

export function getDexcomUnit() {
  return deserializedContents(STORAGE_KEYS.DEXCOM.UNIT, {type: "select"});
}

export function getAlertingEnabled() {
  return deserializedContents(STORAGE_KEYS.ALERTING.ENABLED, {type: "toggle"});
}

export function getAlertingLowThreshold() {
  return deserializedContents(STORAGE_KEYS.ALERTING.LOW_THRESHOLD, {type: "input"});
}

export function getAlertingHighThreshold() {
  return deserializedContents(STORAGE_KEYS.ALERTING.HIGH_THRESHOLD, {type: "input"});
}

function deserializedContents(key, {type}: StorageItemType) {
  switch(type) {
    case "toggle":
      return JSON.parse(settingsStorage.getItem(key) || "{}");
    case "input":
      return JSON.parse(settingsStorage.getItem(key) || "{}").name;
    case "select":
      return JSON.parse(settingsStorage.getItem(key) || "{}").values[0].name;
  }
}
