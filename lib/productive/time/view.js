/**
 * View a single time entry.
 */
const axios = require('../../util/axios');
const hydrateTimeEntry = require('../../util/hydrateTimeEntry');

module.exports = async function view(id) {
  if (!id) {
    throw new Error('id is a required parameter');
  }
  try {
    const response = await axios.get(`/time_entries/${id}`);
    const timeEntry = hydrateTimeEntry(response.data.included)(response.data.data);
    return timeEntry;
  } catch(error) {
    if (error.response.status === 404) {
      return undefined;
    }
    throw error;
  }
};
