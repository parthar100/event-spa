'use strict';

export function getCurrentWeek () {
  let currentDate = window.moment();
  let weekStart = currentDate.clone().startOf('week');
  let days = [];
  for (let i = 0; i <= 6; i++) {
    let dayObj = {};
    dayObj = {
      date: window.moment(weekStart).add(i, 'days').format('YYYY-MM-DD'),
      day: window.moment(weekStart).add(i, 'days').format('dddd'),
      formatedDate: window.moment(weekStart).add(i, 'days').format('MMMM Do'),
      events: null
    };
    days.push(dayObj);
  }
  return days;
};

export function validateEventData (data) {
  return !data.end.date || !data.end.time || !data.start.date || !data.start.time || !data.event.title;
}
