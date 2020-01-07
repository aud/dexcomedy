// Private API
export const DEXCOM_LOGIN_URL = "https://shareous1.dexcom.com/ShareWebServices/Services/General/LoginPublisherAccountByName"
export const dexcomLatestGloucoseUrl = sessionData => "https://shareous1.dexcom.com/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues?sessionId=" + sessionData + "&minutes=1440&maxCount=1"

// Prev registered Dexcom app_id
export const DEXCOM_APP_ID = "d8665ade-9673-4e27-9ff6-92db4ce13d13";

// Settings keys
export const DEXCOM_USERNAME_KEY = 'dexcom_user';
export const DEXCOM_PASSWORD_KEY = 'dexcom_pass';
