/**
  * List time entries for day {date}.
  */
const axios = require('../../util/axios');
const getByType = require('../../util/getByType');
const hydrateTimeEntry = require('../../util/hydrateTimeEntry');

module.exports = async function list(date, personId = process.env.PRODUCTIVE_PERSON_ID) {
  if (!date) {
    throw new Error('date is a required parameter');
  }
  try {
    const response = await axios.get(`/time_entries?filter[after]=${date}&filter[before]=${date}&filter[person_id]=${personId}`);
    const timeEntries = getByType('time_entries')(response.data.data)
      .map(hydrateTimeEntry(response.data.included))
      .sort((a, b) => {
        // Always sort modified entries at the end, for quick overview of your last worked tasks.
        const aUpdated = new Date(a.updated_at);
        const bUpdated = new Date(b.updated_at);
        return aUpdated > bUpdated ? 1 : -1;
      });
    return timeEntries;
  } catch(error) {
    console.error(error);
    return [];
  }
};
