const FindPlacesService = require('../src/places/find-places-service');
const _ = require('lodash');
require('dotenv').config('../');

// this test call to google api so avoid running it
// Increase the default time out of test from 5s to 50s to run this test
test.skip('find without cache', async (done) => {
  const locations = await FindPlacesService.findNearby(1, 'restaurant', '', true);
  expect(_.isEmpty(locations)).toBeFalsy;
  done();
}, 50000);

// 
test('find with cache', async (done) => {
  const locations = await FindPlacesService.findNearby(1);
  expect(_.isEmpty(locations)).toBeFalsy;
  done();
});