/**
 * Main Productive interface
 */

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


module.exports = {
  time: require('./productive/time')
};
