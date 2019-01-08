require('dotenv').config();

const axios = require('axios');
const CliTable = require('cli-table');

const API_ROOT = 'https://api.productive.io/api/v2';
const endpoint = `/organization_memberships`; // /${process.env.PRODUCTIVE_ORGANIZATION_ID}`;

axios.defaults.baseURL = API_ROOT;
axios.defaults.headers.common['X-Auth-Token'] = process.env.PRODUCTIVE_OAUTH_TOKEN;
axios.defaults.headers.common['X-Organization-Id'] = process.env.PRODUCTIVE_ORGANIZATION_ID;
axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';

const getByType = type => data => data.filter(x => x.type === type);

const formatEntry = data => entry => {
  //console.log(entry); process.exit(0);
  if (!entry.relationships.service.data) {
    return '';
  }
  const serviceId = entry.relationships.service.data.id;
  const service = getByType('services')(data).find(x => x.id === serviceId);
  const dealId = service.relationships.deal.data.id;
  const deal = getByType('deals')(data).find(x => x.id === dealId);
  const projectId = deal.relationships.project.data.id;
  const project = getByType('projects')(data).find(x => x.id === projectId);
  return [
    project.attributes.name,
    service.attributes.name,
    `${entry.attributes.time} minutes`
  ];
};

axios.get('/time_entries?filter[after]=2019-01-07&filter[before]=2019-01-19&filter[person_id]=41757&page=1&per_page=200')
  .then(response => {
    const timeEntries = getByType('time_entries')(response.data.data);
    const projects = getByType('projects')(response.data.included);

    const reportLines = timeEntries.map(formatEntry(response.data.included));
    const table = new CliTable({
      chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
        , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
        , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
        , 'right': '' , 'right-mid': '' , 'middle': ' ' },
      style: { 'padding-left': 0, 'padding-right': 0 }
    });
    table.push(...reportLines);

    process.stdout.write(table.toString());
  })
  .catch(error => {
    console.error(error);
  });




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
