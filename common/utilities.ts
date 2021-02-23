import {Gloucose} from './types';

// Dexcom serializes their dates in /Date(msecs)/ format. Guessing this is from
// ASP.NET JSON or something.
//
// This returns the seconds elapsed (Dexcom share returns result <= 5 mins)
export function lastUpdatedTimeInSeconds(date: string): number {
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
export function mgdlToMmol(mgdl: number): number {
  return +(mgdl / 18).toFixed(1);
}

export function kelvinToCelcius(kelvin: number): number {
  return kelvin - 273.15;
}

export function kelvinToFahrenheit(kelvin: number): number {
  return ((kelvin - 273.15) * 1.8) + 32;
}

// Dexcom ranks trends 1-7 (1 = max raise, 7 = max drop). Converts to human
// readable format.
export function humanizedTrend(trend: number): Gloucose['trend'] {
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

export function normalizedLastUpdatedTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor(seconds / 60) % 60;
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}s`;
  } else if (mins > 0) {
    return `${mins}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

// Returns the current date in the format of (eg. Wed. 8)
export function normalizedDate(): string {
  const DAYS = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];

  const today = new Date();

  const dayOfWeek  = today.getDay();
  const dayOfMonth = today.getDate();

  return DAYS[dayOfWeek] + '. ' + dayOfMonth;
}

export function assetPathForTrend(trend: string): string {
  return "images/" + trend + ".png";
}
