/**
 * Interface to Productive time commands
 */
const chalk = require('chalk');
const axios = require('../util/axios');
const formatTable = require('../util/formatTable');
const formatNote = require('../util/formatNote');
const getByType = require('../util/getByType');
const minutesToTime = require('../util/minutesToTime');
const hydrateTimeEntry = require('../util/hydrateTimeEntry');

const formatEntryVerbose = entry => [
  chalk.black(entry.id),
  entry.project.attributes.name,
  chalk.black(`(${entry.service.attributes.name})`),
  chalk.bold(minutesToTime(entry.time)),
  "\n",
  formatNote(entry.note),
  "\n",
  entry.timer_started_at ? chalk.yellow('* timer running') : ''
].join(' ');

const entryToTableRow = entry => ([
  chalk[entry.timer_started_at ? 'yellow' : 'black'](entry.id),
  (entry.timer_started_at ? chalk.yellow : x => x)(entry.project.attributes.name),
  (entry.timer_started_at ? chalk.yellow : chalk.bold)(minutesToTime(entry.time)),
  entry.timer_started_at ? chalk.yellow('*') : ''
]);

module.exports = {
  list({ date, verbose }) {
    axios.get(`/time_entries?filter[after]=${date}&filter[before]=${date}&filter[person_id]=41757`)
      .then(response => {
        const timeEntries = getByType('time_entries')(response.data.data)
          .map(hydrateTimeEntry(response.data.included));

        process.stdout.write(
          verbose
            ? timeEntries.map(formatEntryVerbose).filter(Boolean).join("\n")
            : formatTable(timeEntries.map(entryToTableRow))
        );
      })
      .catch(error => {
        console.error(error);
      });
  },
  view({ id }) {
    if (!id) {
      throw new Error('id is a required parameter');
    }
    axios.get(`/time_entries/${id}`)
      .then(response => {
        const timeEntry = hydrateTimeEntry(response.data.included)(response.data.data);
        process.stdout.write(formatEntryVerbose(timeEntry));
      })
      .catch(error => {
        console.error(error);
      });
  }
};
