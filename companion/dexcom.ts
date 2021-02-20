import {getDexcomUsername, getDexcomPassword} from './store';
import {Result} from '../common/result';
import {lastUpdatedTimeInSeconds, humanizedTrend} from '../common/utilities';

// Private API
const DEXCOM_LOGIN_URL = "https://shareous1.dexcom.com/ShareWebServices/Services/General/LoginPublisherAccountByName"
const DEXCOM_APP_ID = "d8665ade-9673-4e27-9ff6-92db4ce13d13";

// TODO: This URL changes based on account region. Make country configurable?
const dexcomLatestGloucoseUrl = sessionId => "https://shareous1.dexcom.com/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues?sessionId=" + sessionId + "&minutes=1440&maxCount=1"

async function fetchDexcomSessionId(): Promise<Result> {
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

    // Dexcom throws 500s when invalid credentials are used
    if (result.status !== 200) {
      throw new Error(`Dexcom server responded with ${result.status}`);
    }

    const id = await result.json();

    return Result.success(id)
  } catch (err) {
    return Result.failure(err)
  }
}

export async function fetchDexcomData(): Promise<Result> {
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

    // Dexcom throws 500s when invalid credentials are used
    if (result.status !== 200) {
      throw new Error(`Dexcom server responded with ${result.status}`);
    }

    const json = await result.json();

    return Result.success({
      // 'ST' is the last updated date. Normalize to secs.
      lastUpdatedSec: lastUpdatedTimeInSeconds(json[0].ST),
      // Dexcom ranks trends 1-7 (1 = max raise, 7 = max drop)
      trend: humanizedTrend(json[0].Trend),
      // Mg/dL by default
      value: json[0].Value,
    })
  } catch (err) {
    return Result.failure(err);
  }
}
