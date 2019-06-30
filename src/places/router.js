const express = require('express');
const router = express.Router();
const FindPlaceService = require('./find-places-service');

async function findPlaces(req, res, next) {
  const id = req.params['id'];

  try {
    const cities = await FindPlaceService.findNearby('munich');
    res.json(cities);
  } catch (err) {
    console.log(err);
    next(err);
  };

}


router.get('/place/:id', findPlaces);

module.exports = router;
