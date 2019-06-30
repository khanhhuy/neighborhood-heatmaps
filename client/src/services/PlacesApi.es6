import axios from 'axios';


class PlacesApi {

  static async fetchCities() {
    const url = '/api/place/cities';
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  static async fetchLocations(cityId) {
    const url = `/api/place/${cityId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

}

export default PlacesApi;

