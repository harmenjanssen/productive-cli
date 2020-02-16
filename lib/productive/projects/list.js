/**
 * List all projects.
 */
const axios = require('../../util/axios');

module.exports = async function() {
  const response = await axios.get('/projects?per_page=200');
  return response.data.data;
};
