const express = require('express');
const router = express.Router();
const FindPlaceService = require('./find-places-service');
const CITY_LOCATIONS = require('./city_locations.json')['city_locations'];
const _ = require('lodash');

// Return places of a location
async function findPlaces(req, res, next) {
  const id = req.params['id'];

  try {
    const cities = await FindPlaceService.findNearby(id);
    res.json(cities);
  } catch (err) {
    console.log(err);
    next(err);
  };

}

// Return list of location/cities supported
function cities(req, res, next) {
  const cities = _.map(CITY_LOCATIONS, (city) => {
    return {
      id: city.id,
      name: city.name
    }
  })

  res.json(cities);
}

router.get('/place/cities', cities);
router.get('/place/:id', findPlaces);

module.exports = router;
