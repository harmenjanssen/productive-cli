/**
 * Interface to Productive time commands
 */
const axios = require('../util/axios');
const formatTable = require('../util/formatTable');
const getByType = require('../util/getByType');

const formatEntry = data => entry => {
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

module.exports = {
  list() {
    axios.get('/time_entries?filter[after]=2019-01-07&filter[before]=2019-01-19&filter[person_id]=41757&page=1&per_page=200')
      .then(response => {
        const timeEntries = getByType('time_entries')(response.data.data);
        const reportLines = timeEntries.map(formatEntry(response.data.included));

        process.stdout.write(formatTable(reportLines));
      })
      .catch(error => {
        console.error(error);
      });
  }
};
