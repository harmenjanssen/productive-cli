/**
 * Start a new timer.
 */
const axios = require('../../util/axios');
const Fuse = require('fuse.js');
const projectsApi = require('../projects');

module.exports = async function start(project, service) {
  if (!project) {
    throw new Error('project is a required parameter');
  }
  const projects = await projectsApi.list();

  const fuse = new Fuse(projects, {
    keys: ['attributes.name'],
    tokenize: true,
    matchAllTokens: true,
    threshold: 0
  });
  const matches = fuse.search(project);
  if (matches.length > 1) {
    throw new Error(`Projectname ambiguous. Found: \n\n${matches.map(x => x.attributes.name).join('\n')}`);
  }
  console.log(match);
  return '';
};
