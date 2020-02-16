/**
  * Stop the last timer.
  */
const axios = require('../../util/axios');
const dateFormat = require('dateformat');
const list = require('./list');

module.exports = async function stop() {
  const entries = await list(dateFormat(new Date(), 'yyyy-mm-dd'));
  const runningEntry = entries.find(x => !!x.timer_started_at);
  if (!runningEntry) {
    return undefined;
  }
  const response = await axios.put(`/time_entries/${runningEntry.id}/stop`);
  return runningEntry.id;
};
