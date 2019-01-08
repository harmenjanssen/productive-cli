/**
 * Zero-pad a number. You know the drill.
 */
module.exports = function zeroPad(num, desiredLength = 2) {
  return num.toString().length < desiredLength
    ? zeroPad(`0${num.toString()}`, desiredLength)
    : num;
};
