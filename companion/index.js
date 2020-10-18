import asap from "fitbit-asap/companion"
import {
  DEXCOM_LOGIN_URL,
  DEXCOM_APP_ID,
  dexcomLatestGloucoseUrl
} from '../common/dexcom-config';
import {
  mgdlToMmol,
  normalizedTrendAssetName,
  lastUpdatedTimeInSeconds
} from '../common/utilities';
import {
  getDexcomUsername,
  getDexcomPassword,
  getDexcomLowThreshold,
  getDexcomHighThreshold
} from './utilities';
import {settingsStorage} from 'settings';

const UPDATE_GLOUCOSE_LEVELS_BUFFER = 30000; // 30s
const DEFAULT_LOW_GLOUCOSE_THRESHOLD = 4.4;
const DEFAULT_HIGH_GLOUCOSE_THRESHOLD = 11.1;

let username = getDexcomUsername();
let password = getDexcomPassword();
let lowThreshold = getDexcomLowThreshold();
let highThreshold = getDexcomHighThreshold();

// Handle settings updates
// https://dev.fitbit.com/build/guides/settings/
settingsStorage.onchange = () => {
  username = getDexcomUsername();
  password = getDexcomPassword();
  lowThreshold = getDexcomLowThreshold();
  highThreshold = getDexcomHighThreshold();

  // If settings are changed, push latest glucose levels to avoid waiting for
  // the update buffer
  pushLatestGlucoseLevels();
}

function lowGloucoseThreshold() {
  return lowThreshold || DEFAULT_LOW_GLOUCOSE_THRESHOLD;
}

function highGloucoseThreshold() {
  return highThreshold || DEFAULT_HIGH_GLOUCOSE_THRESHOLD;
}

async function fetchDexcomSessionData() {
  const sessionId = await fetchDexcomSessionId();

  const result = await fetch(dexcomLatestGloucoseUrl(sessionId), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return await result.json();
}

async function fetchDexcomSessionId() {
  const result = await fetch(DEXCOM_LOGIN_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      applicationId: DEXCOM_APP_ID,
      accountName: username,
      password: password,
    })
  })

  return await result.json();
}

async function pushLatestGlucoseLevels() {
  const data = await fetchDexcomSessionData();
  const latestEntry = data[0];

  asap.send({
    mgdl: latestEntry.Value,
    trendAsset: normalizedTrendAssetName(latestEntry.Trend),
    lowThreshold: lowGloucoseThreshold(),
    highThreshold: highGloucoseThreshold(),
    // 'ST' seems to be the last updated date
    lastUpdated: lastUpdatedTimeInSeconds(latestEntry.ST),
  })
}

(() => {
  asap.cancel();

  pushLatestGlucoseLevels();
  setInterval(() => pushLatestGlucoseLevels(), UPDATE_GLOUCOSE_LEVELS_BUFFER);
})();
