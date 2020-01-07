// http://www.bcchildrens.ca/endocrinology-diabetes-site/documents/glucoseunits.pdf
// [BG (mmol/L) * 18] = BG (mg/dL)
//
// Return the normalized mmol/L, rounded to the tenth decimal
export function mgdlToMmol(mgdl) {
  return +(mgdl / 18).toFixed(2);
}

// For some reason Dexcom ranks trends 1-7 (1 = max raise, 7 = max drop).
// The strings returned here directly correspond to their asset name in /resources
export function normalizedTrend(trend) {
  switch(trend) {
    case 1:
      return 'doubleRaisedArrow';
    case 2:
      return 'singleRaisedArrow';
    case 3:
      return 'halfRaisedArrow';
    case 4:
      return 'evenArrow';
    case 5:
      return 'halfDroppedArrow';
    case 6:
      return 'singleDroppedArrow';
    case 7:
      return 'doubleDroppedArrow';
    default:
      return 'unknownValue';
  }
}

// Dexcom serializes their dates in /Date(msecs)/ format. Guessing this is from
// ASP.NET JSON or something alike.
//
// This returns a normalized time, handling seconds and minutes (Dexcom share
// returns result <= 5 mins)
export function normalizedLastUpdatedTime(date) {
  const current = new Date(parseInt(date.substr(6)));
  const elapsed = (new Date() - current) / 1000;

  if (elapsed >= 60) {
    const mins = Math.floor(elapsed % 3600 / 60);
    const secs = Math.floor(elapsed % 60);

    return `${mins}m ${secs}s`;
  } else {
    const secs = Math.floor(elapsed % 60);
    return `${secs}s`;
  }
}
