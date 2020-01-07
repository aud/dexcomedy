import asap from "fitbit-asap/companion"
import {DEXCOM_LOGIN_URL, DEXCOM_APP_ID, dexcomLatestGloucoseUrl} from '../common/dexcom-config';
import {mgdlToMmol, normalizedTrend, normalizedLastUpdatedTime} from '../common/utilities';

const UPDATE_GLOUCOSE_LEVELS_BUFFER = 300000; // 30s

async function fetchDexcomSessionData() {
  const sessionId = await fetchDexcomSessionId({
    username: '',
    password: '',
  });

  const result = await fetch(dexcomLatestGloucoseUrl(sessionId), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return await result.json();
}

async function fetchDexcomSessionId({username, password}) {
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
    mmol: mgdlToMmol(latestEntry.Value),
    trend: normalizedTrend(latestEntry.Trend),
    // 'ST' seems to be the last updated date
    lastUpdated: normalizedLastUpdatedTime(latestEntry.ST),
  })
}

(() => {
  asap.cancel();

  pushLatestGlucoseLevels();
  setInterval(() => pushLatestGlucoseLevels(), UPDATE_GLOUCOSE_LEVELS_BUFFER);
})();
