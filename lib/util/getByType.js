/**
 * Filter an API response by type.
 */
module.exports = type => data => data.filter(x => x.type === type);


