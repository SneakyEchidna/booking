import moment from 'moment';

export const startOfWeek = moment().startOf('isoWeek');
export const endOfWeek = moment().endOf('isoWeek');
export const isSameDate = (a, b) => {
  return b.some(e => a.isSame(e));
};
export const getWeekDays = (start, end, returnString) => {
  let days = [];
  let currentDay = start.clone();
  while (currentDay.format() <= end.format()) {
    if (returnString) {
      days.push(currentDay.clone().format('YYYY-MM-DD'));
      currentDay.add(1, 'day');
      continue;
    }
    days.push(currentDay.clone());
    currentDay.add(1, 'day');
  }
  return days;
};
export const getWeekDaysFromString = (a, b) => {
  const start = moment(a);
  const end = moment(b);
  return getWeekDays(start, end, true);
};
export const daysBetween = (a, b) => {
  return moment(a).diff(moment(b), 'days');
};
export const normalizeDays = (a, b) => {
  const days = daysBetween(a, b);
  if (days <= 1) {
    return 1;
  } else return days;
};
