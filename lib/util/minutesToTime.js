/**
 * Function for formatting minutes as time.
 * Example:
 *
 * - 120 = 02:00
 * -  40 = 00:40
 * -  74 = 01:14
 */
const zeroPad = require('./zeroPad');

module.exports = minutesAmount => {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;
  return `${zeroPad(hours)}:${zeroPad(minutes)}`;
};
