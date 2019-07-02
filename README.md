# Neighborhood Heatmaps

This project displays a heatmap distribution of a property type in a city. For example:
- Restaurants in Berlin
- Pubs in Munich
- Hotels in Munich

**Restaurants in Berlin**

![restaurant distribution in Berlin](https://raw.githubusercontent.com/khanhhuy/neighborhood-heatmaps/master/public/images/heatmap-berlin.png)

- Current version only supports `restaurant` type
- More types of property such as pubs, hotels... would be supported in future versions

## Technologies
- Server: ExpressJS
- Client: VueJS, Parcel
- Google Maps API, Google Places API

## How it works

### Retrieving location data
- Location data in a city is fetched from Google Places API. For example: restaurants within 5km from the center of Munich
- Google Places API returns only 60 results for a query. Therefore, I used multiple locations from a city to increase the number of results
- Retrieving locations data is a really expensive operation (Google charges for each request), so data is cached for a few day

### Heatmap visualization
- All data points is fetched to the Google Heatmaps layer to draw on a map.


## References
https://developers.google.com/maps/documentation/javascript/examples/layer-heatmap

https://developers.google.com/places/web-service/search#nearby-search-and-text-search-responses



