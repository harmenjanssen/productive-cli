/**
 * Interface to Productive time commands
 */
const chalk = require('chalk');
const axios = require('../util/axios');
const formatTable = require('../util/formatTable');
const getByType = require('../util/getByType');
const minutesToTime = require('../util/minutesToTime');

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
    chalk.black(entry.id),
    project.attributes.name,
    //service.attributes.name,
    chalk.bold(minutesToTime(entry.attributes.time)),
  ].join(' ') + "\n"+     entry.attributes.note + "\n"

};

module.exports = {
  list({ date }) {
    axios.get(`/time_entries?filter[after]=${date}&filter[before]=${date}&filter[person_id]=41757`)
      .then(response => {
        const timeEntries = getByType('time_entries')(response.data.data);
        const reportLines = timeEntries.map(formatEntry(response.data.included));
        process.stdout.write(reportLines.filter(Boolean).join("\n"));

        //process.stdout.write(formatTable(reportLines));
      })
      .catch(error => {
        console.error(error);
      });
  },
  view({ id }) {
    if (!id) {
      throw new Error('id is a required parameter');
    }
    axios.get(`/time_entries/${id}`)
      .then(response => {
        //
        // TODO general hydrate method die zowel voor list als view gebruikt kan worden.
        //
        //
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
};
