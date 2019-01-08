const TurndownService = require('turndown')

module.exports = note => {
  const turndownService = new TurndownService();
  return turndownService.turndown(note);
};
