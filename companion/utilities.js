import {settingsStorage} from "settings";

const DEXCOM_USERNAME_KEY = 'dexcom_user';
const DEXCOM_PASSWORD_KEY = 'dexcom_pwd';

export function getDexcomUsername() {
  return deserializedContents(DEXCOM_USERNAME_KEY);
}

export function getDexcomPassword() {
  return deserializedContents(DEXCOM_PASSWORD_KEY);
}

function deserializedContents(key) {
  return JSON.parse(settingsStorage.getItem(key)) || {};
}
