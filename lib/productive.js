/**
 * Main Productive interface
 */

/*
 *
 *

{
  "data": {
    "type": "organization-memberships",
    "relationships": {
      "timer": {
        "data": {
            "type": "time_entries",
            "id": "1"
        }
      }
    }
  }
}
*/

// /time_entries?filter[after]=2019-01-02&filter[before]=2019-01-13&filter[person_id]=41757&page=1&per_page=200

const formatter = require('./util/formatter');
const timeApi = require('./productive/time');

module.exports = {
  time: {
    /**
     * List all running timers after {date}.
     * Use {verbose} to get detailed results.
     */
    async list({ date, verbose }) {
      const timeEntries = await timeApi.list(date);
      const render = verbose ? formatter.verbose : formatter.minimal;
      process.stdout.write(render(timeEntries));
    },
    /**
     * View a single time entry.
     * This returns the verbose view from the list command.
     */
    async view({ id }) {
      const timeEntry = await timeApi.view(id);
      if (!timeEntry) {
        process.stdout.write(`${id} not found.`);
      } else {
        process.stdout.write(formatter.single(timeEntry));
      }
    },
    /**
     * Resume the last running time entry, or the one with {id}.
     */
    async resume({ id }) {
      const response = await timeApi.resume(id);
      if (!response) {
        process.stdout.write('Nothing to resume.');
      } else {
        process.stdout.write(`Resumed ${response}.`);
      }
    },
    /**
     * Stop the last running timer.
     */
    async stop() {
      const response = await timeApi.stop();
      if (!response) {
        process.stdout.write('Nothing to stop.');
      } else {
        process.stdout.write(`Stopped ${response}.`);
      }
    }
  }
};
