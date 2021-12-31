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

export function normalizedLastUpdatedTime(seconds) {
  if (seconds >= 60) {
    const mins = Math.floor(seconds % 3600 / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}m ${secs}s`;
  }

  const secs = Math.floor(seconds % 60);
  return `${secs}s`;
}
