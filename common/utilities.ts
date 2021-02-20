// Dexcom serializes their dates in /Date(msecs)/ format. Guessing this is from
// ASP.NET JSON or something.
//
// This returns the seconds elapsed (Dexcom share returns result <= 5 mins)
export function lastUpdatedTimeInSeconds(date: string) {
  const current = new Date(
    parseInt(date.substr(6)),
  );
  const elapsed = (new Date().valueOf() - current.valueOf()) / 1000;

  return Math.round(elapsed);
}

// http://www.bcchildrens.ca/endocrinology-diabetes-site/documents/glucoseunits.pdf
// [BG (mmol/L) * 18] = BG (mg/dL)
//
// Return the normalized mmol/L, rounded to the tenth decimal
export function mgdlToMmol(mgdl: number) {
  return +(mgdl / 18).toFixed(1);
}

export function humanizedTrend(trend: number) {
  switch(trend) {
    case 1:
      return 'double-up';
    case 2:
      return 'up';
    case 3:
      return 'half-up';
    case 4:
      return 'steady';
    case 5:
      return 'half-down';
    case 6:
      return 'down';
    case 7:
      return 'double-down';
    case 8:
      // The receiver cannot work out if the glucose is going up or down
      return 'unknown';
    default:
      throw new Error(`Got ${trend}, this is a bug.`);
  }
}
