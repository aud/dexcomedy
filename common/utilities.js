const DAYS = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

// Returns the current date in the format of (eg. Wed. 8)
export function normalizedDate() {
  const today = new Date();

  const dayOfWeek  = today.getDay();
  const dayOfMonth = today.getDate();

  return DAYS[dayOfWeek] + '. ' + dayOfMonth;
}

// http://www.bcchildrens.ca/endocrinology-diabetes-site/documents/glucoseunits.pdf
// [BG (mmol/L) * 18] = BG (mg/dL)
//
// Return the normalized mmol/L, rounded to the tenth decimal
export function mgdlToMmol(mgdl) {
  return +(mgdl / 18).toFixed(1);
}

// For some reason Dexcom ranks trends 1-7 (1 = max raise, 7 = max drop).
// The strings returned here directly correspond to their asset name in /resources
export function normalizedTrendAssetName(trend) {
  let assetName;

  switch(trend) {
    case 1:
      assetName = 'arrow-double-up';
      break;
    case 2:
      assetName = 'arrow-up';
      break
    case 3:
      assetName = 'arrow-half-up';
      break
    case 4:
      assetName = 'arrow-right';
      break
    case 5:
      assetName = 'arrow-half-down';
      break
    case 6:
      assetName = 'arrow-down';
      break
    case 7:
      assetName = 'arrow-double-down';
      break
  }

  return `images/${assetName}.png`;
}

// Dexcom serializes their dates in /Date(msecs)/ format. Guessing this is from
// ASP.NET JSON or something alike.
//
// This returns the seconds elapsed (Dexcom share returns result <= 5 mins)
export function lastUpdatedTimeInSeconds(date) {
  const current = new Date(parseInt(date.substr(6)));
  const elapsed = (new Date() - current) / 1000;

  return Math.round(elapsed);
}

export function normalizedLastUpdatedTime(seconds) {
  if (seconds >= 60) {
    const mins = Math.floor(seconds % 3600 / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}m ${secs}s`;
  }

  const secs = Math.floor(seconds % 60);
  return `${secs}s`;
}
