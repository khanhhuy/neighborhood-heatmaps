const Promise = require('q').Promise;
const _ = require('lodash');
const moment = require('moment');

const Cache = require('../cache').Cache;

var googleMapsClient = null;
const CITY_LOCATIONS = require('./city_locations.json')['city_locations'];

// Find places from a location using Google Place API
class FindPlacesService {

  static getMapClient() {
    if (!googleMapsClient) {
      googleMapsClient = require('@google/maps').createClient({
        key: process.env.MAP_API_KEY,
        Promise: Promise
      });
      console.info("Init Google Maps client");
    }
    return googleMapsClient;
  }

  static parseResponse(responseResults) {
    const places = _.map(responseResults, (place) => {
      return {
        name: place["name"],
        lat: place["geometry"]["location"]["lat"],
        lng: place["geometry"]["location"]["lng"],
        rating: place["rating"],
        user_ratings_total: place["user_ratings_total"]
      }
    });
    return places;
  }

  // Fetch places from Google Places API
  // @location: [lat, lng]
  static async fetchPlaces(mapClient, location) {
    const self = this;

    let response = await mapClient.placesNearby({
      location: location,
      radius: 5000,
      type: 'restaurant'
    }).asPromise();

    let nearbyPlaces = _.concat([], self.parseResponse(response['json']['results']));

    while (response['json']['next_page_token']) {
      try {
        response = await mapClient.placesNearby({ pagetoken: response['json']['next_page_token'] }).asPromise();
        nearbyPlaces = _.concat(nearbyPlaces, self.parseResponse(response['json']['results']));
      } catch (responseErr) {
        const status = responseErr['json']['status'];
        // https://developers.google.com/places/web-service/search#PlaceSearchStatusCodes
        switch (status) {
          case 'INVALID_REQUEST':
            // next page is not yet ready
            console.info("Wait for next page ready...");
            await new Promise((resolve) => { setTimeout(resolve, 2000) });
            break;
          case 'OVER_QUERY_LIMIT':
            throw Error('Over query limit');
          case 'REQUEST_DENIED':
          case 'UNKNOWN_ERROR':
            console.error(responseErr);
            throw Error(responseErr);
        }
      }
    }

    return nearbyPlaces;
  }

  // Google Place API only returns 60 results for each location.
  // So we use multiple locations to fetch more result
  //
  // TODO: We currently use 4 locations for each city which are not many, find a way to generate locations automatically
  // 
  // return [{ name, lat, lng, rating, user_rating_totals }]
  static async findNearby(cityId, propertyType = 'restaurant', keyword = '', bustCache = false) {
    const city = _.find(CITY_LOCATIONS, (city) => city.id == cityId);
    const centers = city.centers;

    const cacheKey = `${city.name}_${cityId}`;

    if (!bustCache) {
      const cachedData = await Cache.fetchLatest(cacheKey);

      if (cachedData) {
        const { data, createdAt } = cachedData;
        if (moment().subtract(5, 'day') < createdAt) {
          return data;
        }
      }
    }

    const mapClient = this.getMapClient();

    let nearbyPlaces = [];

    for (let center of centers) {
      const places = await this.fetchPlaces(mapClient, [center['lat'], center['lng']]);
      nearbyPlaces = _.concat(places, nearbyPlaces)
    }
    nearbyPlaces = _.uniqBy(nearbyPlaces, (place) => place.name);

    Cache.setWithDate(cacheKey, nearbyPlaces).then(_.noop);
    return nearbyPlaces;
  }

}

module.exports = FindPlacesService