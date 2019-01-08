/**
 * Take the data from the `included` property returned by Productive APIs,
 * and use it to hydrate the `relationships` properies of the time entry.
 */
const getByType = require('../util/getByType');

module.exports = meta => entry => {
  if (!entry.relationships.service.data) {
    return '';
  }
  const serviceId = entry.relationships.service.data.id;
  const service = getByType('services')(meta).find(x => x.id === serviceId);
  const dealId = service.relationships.deal.data.id;
  const deal = getByType('deals')(meta).find(x => x.id === dealId);
  const projectId = deal.relationships.project.data.id;
  const project = getByType('projects')(meta).find(x => x.id === projectId);
  return ({
    id: entry.id,
    ...entry.attributes,
    deal,
    project,
    service
  });
};
