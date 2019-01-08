require('dotenv').config();

const subcommander = require('subcommander');
const productive = require('./lib/productive');

subcommander
  .command('time', {
    desc: 'Manage your time entries'
  })
  .command('list', {
    desc: 'List your time entries',
    callback: productive.time.list
  });

subcommander.parse();
