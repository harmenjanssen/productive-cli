/**
 * Resume the last started timer of the day, or the one with {id}.
 */
const axios = require('../../util/axios');
const dateFormat = require('dateformat');
const list = require('./list');

module.exports = async function resume(id) {
  if (!id) {
    const entries = await list(dateFormat(new Date(), 'yyyy-mm-dd'));
    if (!entries.length) {
      return undefined;
    }
    const lastEntry = entries[entries.length - 1];
    return resume(lastEntry.id);
  }
  try {
    const response = await axios.put(`/time_entries/${id}/start`);
    return id;
  } catch(error) {
    // Note: 403 can mean the timer is already running.
    if (error.response.status === 404 || error.response.status === 403) {
      return undefined;
    }
    throw error;
  }
};
