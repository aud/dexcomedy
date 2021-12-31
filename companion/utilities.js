import {settingsStorage} from "settings";
import {
  DEXCOM_USERNAME_KEY,
  DEXCOM_PASSWORD_KEY,
  DEXCOM_SERVER_KEY,
  DEXCOM_LOW_GLOUCOSE_THRESHOLD,
  DEXCOM_HIGH_GLOUCOSE_THRESHOLD
} from '../common/dexcom-config';

export function getDexcomUsername() {
  return deserializedContents(DEXCOM_USERNAME_KEY);
}

export function getDexcomPassword() {
  return deserializedContents(DEXCOM_PASSWORD_KEY);
}

export function getDexcomLowThreshold() {
  return deserializedContents(DEXCOM_LOW_GLOUCOSE_THRESHOLD);
}

export function getDexcomHighThreshold() {
  return deserializedContents(DEXCOM_HIGH_GLOUCOSE_THRESHOLD);
}

export function getDexcomServer() {
  return deserializedContents(DEXCOM_SERVER_KEY);
}

// Fitbit injects the values into `name` key
function deserializedContents(key) {
  return JSON.parse(settingsStorage.getItem(key) || '{}').name;
}
