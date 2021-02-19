import {getDexcomUsername, getDexcomPassword} from './store';
import {Result} from '../common/result';

// Private API
const DEXCOM_LOGIN_URL = "https://shareous1.dexcom.com/ShareWebServices/Services/General/LoginPublisherAccountByName"
const DEXCOM_APP_ID = "d8665ade-9673-4e27-9ff6-92db4ce13d13";

const dexcomLatestGloucoseUrl = sessionData => "https://shareous1.dexcom.com/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues?sessionId=" + sessionData + "&minutes=1440&maxCount=1"


async function fetchDexcomSessionId() {
  try {
    const result = await fetch(DEXCOM_LOGIN_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        applicationId: DEXCOM_APP_ID,
        accountName: getDexcomUsername(),
        password: getDexcomPassword(),
      })
    })

    const id = await result.json();
    return Result.success(id)
  } catch (err) {
    return Result.failure(err)
  }
}

export async function fetchDexcomData() {
  const sessionIdResult = await fetchDexcomSessionId();

  // Bail early if error
  if (sessionIdResult.error) {
    return sessionIdResult;
  }

  try {
    const result = await fetch(dexcomLatestGloucoseUrl(sessionIdResult.payload), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const {
      // 'ST' seems to be the last updated date
      ST: lastUpdated,
      // Dexcom ranks trends 1-7 (1 = max raise, 7 = max drop)
      Trend: trend,
      // Mg/dL by default
      Value: value,
    } = await result.json();

    return Result.success({
      lastUpdated,
      trend,
      value,
    })
  } catch (err) {
    return Result.failure(err);
  }
}
