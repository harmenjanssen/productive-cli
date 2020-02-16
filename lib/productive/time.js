/**
 * Interface to Productive time commands
 */
module.exports = {
  list: require('./time/list'),
  resume: require('./time/resume'),
  start: require('./time/start'),
  stop: require('./time/stop'),
  view: require('./time/view'),
};
