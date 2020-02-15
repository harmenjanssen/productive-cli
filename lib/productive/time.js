/**
 * Interface to Productive time commands
 */
const axios = require('../util/axios');
const dateFormat = require('dateformat');
const getByType = require('../util/getByType');
const hydrateTimeEntry = require('../util/hydrateTimeEntry');

module.exports = {
  /**
   * List time entries after {date}.
   */
  async list(date) {
    if (!date) {
      throw new Error('date is a required parameter');
    }
    try {
      const response = await axios.get(`/time_entries?filter[after]=${date}&filter[before]=${date}&filter[person_id]=41757`);
      const timeEntries = getByType('time_entries')(response.data.data)
        .map(hydrateTimeEntry(response.data.included))
        .sort((a, b) => {
          const aUpdated = new Date(a.updated_at);
          const bUpdated = new Date(b.updated_at);
          return aUpdated > bUpdated ? 1 : -1;
        });
      return timeEntries;
    } catch(error) {
      console.error(error);
      return [];
    }
  },
  /**
   * View a single time entry.
   */
  async view(id) {
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
  },
  /**
   * Resume the last started timer of the day, or the one with {id}.
   */
  async resume(id) {
    if (!id) {
      const list = await this.list(dateFormat(new Date(), 'yyyy-mm-dd'));
      if (!list.length) {
        return undefined;
      }
      const lastEntry = list[list.length - 1];
      return this.resume(lastEntry.id);
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
  },
  /**
   * Stop the last timer.
   */
  async stop() {
    const list = await this.list(dateFormat(new Date(), 'yyyy-mm-dd'));
    const runningEntry = list.find(x => !!x.timer_started_at);
    if (!runningEntry) {
      return undefined;
    }
    const response = await axios.put(`/time_entries/${runningEntry.id}/stop`);
    return runningEntry.id;
  }
};
