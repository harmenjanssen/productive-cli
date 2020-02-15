#!/usr/bin/env node
require('dotenv').config();

const subcommander = require('subcommander');
const dateFormat = require('dateformat');
const chalk = require('chalk');
const productive = require('./lib/productive');

const reportingExceptions = fn => (...args) => {
  try {
    return fn(...args);
  } catch (err) {
    process.stdout.write(
      '\n' +
      chalk.red(chalk.bold('Error: ') + err.toString().replace('Error: ', '')) +
      '\n\n'
    );
  }
};

subcommander
  .command('time', {
    desc: 'Manage your time entries'
  })
  .command('list', {
    desc: 'List your time entries',
    callback: productive.time.list
  })
  .option('verbose', {
    abbr: 'v',
    default: false,
    flag: true
  })
  .option('date', {
    abbr: 'd',
    default: dateFormat(new Date(), 'yyyy-mm-dd')
  })
  .end()
  .command('view', {
    desc: 'View time entry details',
    callback: reportingExceptions(productive.time.view)
  })
  .option('id', {
    abbr: 'i',
    desc: 'Id of the time entry'
  })
  .end()
  .command('resume', {
    desc: 'Resume the last timer, or the given id.',
    callback: reportingExceptions(productive.time.resume)
  })
  .option('id', {
    abbr: 'i',
    desc: 'Id of the time entry',
    default: undefined
  })
  .end()
  .command('stop', {
    desc: 'Stop the current running timer.',
    callback: reportingExceptions(productive.time.stop)
  })
  .end()
;

subcommander.parse();
