/**
 * Prepped Axios instance
 */
const axios = require('axios');
const API_ROOT = 'https://api.productive.io/api/v2';

axios.defaults.baseURL = API_ROOT;
axios.defaults.headers.common['X-Auth-Token'] = process.env.PRODUCTIVE_OAUTH_TOKEN;
axios.defaults.headers.common['X-Organization-Id'] = process.env.PRODUCTIVE_ORGANIZATION_ID;
axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';

module.exports = axios;
