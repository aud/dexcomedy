import asap from "fitbit-asap/companion"
import {DexcomClient} from "dexcom-share-api"
import {
  getDexcomUsername,
  getDexcomPassword,
  getDexcomLowThreshold,
  getDexcomHighThreshold,
  getDexcomServer
} from './utilities';
import {settingsStorage} from 'settings';

const UPDATE_GLOUCOSE_LEVELS_BUFFER = 30000; // 30s
const DEFAULT_LOW_GLOUCOSE_THRESHOLD = 4.4;
const DEFAULT_HIGH_GLOUCOSE_THRESHOLD = 11.1;

let username = getDexcomUsername();
let password = getDexcomPassword();
let dexcomServer = getDexcomServer();
let lowThreshold = getDexcomLowThreshold();
let highThreshold = getDexcomHighThreshold();

// Handle settings updates
// https://dev.fitbit.com/build/guides/settings/
settingsStorage.onchange = () => {
  username = getDexcomUsername();
  password = getDexcomPassword();
  dexcomServer = getDexcomServer();
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

async function pushLatestGlucoseLevels() {
  const client = new DexcomClient({
    username,
    password,
    server: dexcomServer,
  });

  const data = await client.getEstimatedGlucoseValues();
  const latestEntry = data[0];

  const lastUpdatedTimeInSeconds = Math.round(
    (new Date().getTime() - new Date(latestEntry.timestamp).getTime()) / 1000,
  )

  asap.send({
    mmol: Math.round(latestEntry.mmol, 1),
    trend: latestEntry.trend,
    lowThreshold: lowGloucoseThreshold(),
    highThreshold: highGloucoseThreshold(),
    lastUpdated: lastUpdatedTimeInSeconds
  })
}

(() => {
  asap.cancel();

  pushLatestGlucoseLevels();
  setInterval(() => pushLatestGlucoseLevels(), UPDATE_GLOUCOSE_LEVELS_BUFFER);
})();
