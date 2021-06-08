import { format } from 'date-fns';

export function parseDate(date) {
  return new Date(date.split('/').reverse().join('-'));
}

export function getDateWithTime(date, time) {
  const modDate = parseDate(date);
  return new Date(format(modDate, `yyyy-MM-dd ${time}`));
}