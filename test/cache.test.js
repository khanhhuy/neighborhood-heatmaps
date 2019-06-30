const { Cache, BASE_DIR, DATE_FORMAT, SEPARATOR } = require('../src/cache');
const MockDate = require('mockdate');
const fs = require('fs');
const moment = require('moment');

const data = [
  {
    'name': 'ibis Hotel Muenchen City West',
    'lat': 48.1347001,
    'lng': 11.5237464,
    'rating': 4,
    'user_ratings_total': 739
  },
  {
    'name': 'Hotel Cristal',
    'lat': 48.1375634,
    'lng': 11.5591702,
    'rating': 3.8,
    'user_ratings_total': 612
  }
];

const date = '2019-06-29T00:00:00';

test('write to file', async (done) => {
  MockDate.set(date);

  const expectedDate = moment().format(DATE_FORMAT);
  await Cache.setWithDate('munich', data);

  fs.readFile(`${BASE_DIR}/munich${SEPARATOR}${expectedDate}`, (err, buff) => {
    expect(err).toBeNull();
    const cachedData = JSON.parse(buff.toString());
    expect(cachedData).toEqual(data);
    done();
  });

});

test('read latest cache file', async (done) => {
  const key = '_temp_city';

  MockDate.set('2019-06-29T00:00:00');
  await Cache.setWithDate(key, data);

  MockDate.set('2019-06-29T00:00:01');
  await Cache.setWithDate(key, data);
  await Cache.setWithDate('should_not_match', data);


  const { data: cachedData, createdAt } = await Cache.fetchLatest(key);

  MockDate.set('2019-06-29T00:00:01');
  expect(createdAt.valueOf()).toEqual(moment().valueOf());
  expect(cachedData).toEqual(data);

  done();
});