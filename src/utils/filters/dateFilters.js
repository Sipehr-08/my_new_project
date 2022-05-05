import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export function readableDate(date) {
  if (!date) return '';
  let parsedDate = format(parseISO(date), 'dd MMM yyyy', { locale: ru });
  return parsedDate;
}

export function readableDateMonth(date) {
  if (!date) return '';
  let parsedDate = format(parseISO(date), 'dd MMM', { locale: ru });
  return parsedDate;
}
export function readableDateYear(date) {
  if (!date) return '';
  let parsedDate = format(parseISO(date), 'MMM', { locale: ru });
  return parsedDate;
}

export function readableDateNews(date) {
  if (!date) return '';
  return format(date, 'yyyy-MM-dd');
}

export function convertDayToDate(countDay) {
  let years = Math.floor(countDay / 365);
  let months = Math.floor((countDay % 365) / 30);
  let days = Math.floor((countDay % 365) % 30);
  let yearsDisplay = years > 0 ? years + ' г. ' : '';
  let monthsDisplay = months > 0 ? months + ' м. ' : '';
  let daysDisplay = days > 0 ? days + ' д.' : '';
  return yearsDisplay + monthsDisplay + daysDisplay;
}

export const readableTime = date => {
  if (!date) return '';
  let parsedDate = format(parseISO(date), 'hh:mm BBB', { locale: ru });
  return parsedDate;
};
