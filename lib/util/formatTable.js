/**
 * Function for displaying data in a minimal table format
 */
const CliTable = require('cli-table');

module.exports = data => {
  const table = new CliTable({
    chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
      , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
      , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
      , 'right': '' , 'right-mid': '' , 'middle': ' ' },
    style: { 'padding-left': 0, 'padding-right': 0 }
  });
  table.push(...data);
  return table.toString();
};
