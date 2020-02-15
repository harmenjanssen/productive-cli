/**
 * Format time entries.
 * TODO might rename file to "time"-something
 */
const chalk = require('chalk');
const formatNote = require('./formatNote');
const formatTable = require('./formatTable');
const minutesToTime = require('./minutesToTime');

const getTotalMinutes = entries => entries.reduce((total, entry) => total + entry.time, 0);

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

const verboseOutput = timeEntries =>
  `${timeEntries.map(formatEntryVerbose).filter(Boolean).join("\n")}
Total time: ${chalk.bold(minutesToTime(getTotalMinutes(timeEntries)))}`;

const minimalOutput = timeEntries =>
  formatTable(
    timeEntries.map(entryToTableRow).concat(
      [['', 'Total', chalk.bold(minutesToTime(getTotalMinutes(timeEntries)))]]
    )
  );


module.exports = {
  minimal: minimalOutput,
  verbose: verboseOutput,
  single: formatEntryVerbose,
};
