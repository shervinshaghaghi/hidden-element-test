/* eslint-disable */
export const msToTime = (s) => {
  const pad = (n, z) => {
    z = z || 2;
    return ('00' + n).slice(-z);
  };

  let ms = s % 1000;
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  let hrs = (s - mins) / 60;

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms, 1)}`;
};
