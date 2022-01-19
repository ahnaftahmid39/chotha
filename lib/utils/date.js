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

function timeDiffString({ year, day, hour, minute }) {
  let timeDiff = '';
  if (year == 1) {
    timeDiff += 'Last year ';
    return timeDiff;
  } else if (year > 1) {
    timeDiff += year.toString() + ' years ';
  } else {
    if (day == 1) {
      timeDiff += 'Yesterday ';
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

  timeDiff += 'ago';
  return timeDiff;
}

export { dateDiff, timeDiffString};
