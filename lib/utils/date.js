function dateDiff(d1, d2) {
  let d = Math.abs(d1 - d2) / 1000;
  const year = Math.floor(d / (365 * 24 * 3600));
  d -= year * 365 * 24 * 3600;
  const day = Math.floor(d / (24 * 3600));
  d -= day * 24 * 3600;
  const hour = Math.floor(d / 3600);
  d -= hour * 3600;
  const minute = Math.floor(d / 60);
  return { year, day, hour, minute };
}

function timeDiffString({ year, day, hour, minute }, past = false) {
  let timeDiff = '';
  if (year == 1) {
    if (past) timeDiff += 'Last year ';
    else timeDiff += 'Next year ';
    return timeDiff;
  } else if (year > 1) {
    timeDiff += year.toString() + ' years ';
  } else {
    if (day == 1) {
      if (past) timeDiff += 'Yesterday ';
      else timeDiff += 'Tomorrow ';
      return timeDiff;
    } else if (day > 1) {
      timeDiff += day.toString() + ' days ';
    } else {
      if (hour == 1) {
        timeDiff += hour.toString() + ' hour ';
      } else if (day > 1) {
        timeDiff += hour.toString() + ' hours ';
      } else {
        if (minute == 1) {
          timeDiff += minute.toString() + ' minute ';
        } else if (day > 1) {
          timeDiff += minute.toString() + ' minutes ';
        }
      }
    }
  }

  return timeDiff;
}

function getDateTime(date = new Date()) {
  const today = new Date();

  let timeStr = '';
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  if (hours < 1) {
    hours = 12;
  } else if (hours > 12) {
    hours = hours % 12;
  }
  timeStr = `${hours.toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')} ${ampm}`;

  let dateStr = '';
  if (
    today.getFullYear() == date.getFullYear() &&
    today.getMonth() == date.getMonth()
  ) {
    const d1 = today.getDate();
    const d2 = date.getDate();
    if (d1 - d2 == 1) {
      dateStr += 'Yesterday at';
    } else if (d1 - d2 == 0) {
      dateStr += 'Today at';
    } else {
      dateStr = date.toDateString();
    }
  } else {
    dateStr = date.toDateString();
  }

  return `${dateStr} ${timeStr}`;
}

export { dateDiff, getDateTime, timeDiffString };
