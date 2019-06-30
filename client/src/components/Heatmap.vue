<template>
  <div class="heatmap-wrapper">
    <location-selection @input="selectCity" class="location-selection flex-0"></location-selection>
    <div class="heatmap">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import LocationSelection from "./LocationSelection.vue";
import PlacesApi from "../services/PlacesApi";
import _ from "lodash";

const GRADIENT = [
  "rgba(124, 119, 255, 0)", //  must have the last color(#7791DF) with opacity 0
  "#7791DF",
  "#89C9D8",
  "#97F5D3",
  "#98F848",
  "#BEFF16",
  "#E4FF00",
  "#FFFA00",
  "#EFCD02",
  "#E46402",
  "#D4400E",
  "#FF0000"
];

export default {
  name: "Heatmap",
  components: {
    LocationSelection
  },
  data() {
    return {
      cityId: null,
      locations: [],
      centerLat: null,
      centerLng: null,
      zoomLevel: 12
    };
  },
  methods: {
    openMenu() {
      this.shownMenu = !this.shownMenu;
    },
    async fetchLocations() {
      const locations = await PlacesApi.fetchLocations(this.cityId);
      this.locations = locations;
      this.computeMapCenterPoint();
      this.drawMap();
    },
    computeMapCenterPoint() {
      this.centerLat = _.meanBy(this.locations, l => l.lat);
      this.centerLng = _.meanBy(this.locations, l => l.lng);
    },
    selectCity(cityId) {
      this.cityId = cityId;
      this.fetchLocations();
    },
    buildHeatmapPoints(locations) {
      return _.map(locations, location => {
        return {
          location: new window.google.maps.LatLng(location.lat, location.lng),
          weight: location.rating
        };
      });
    },
    drawMap() {
      let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.centerLat, lng: this.centerLng },
        zoom: this.zoomLevel
      });

      new google.maps.visualization.HeatmapLayer({
        data: this.buildHeatmapPoints(this.locations),
        map: map,
        radius: 20,
        gradient: GRADIENT,
        opacity: 0.75
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.heatmap-wrapper {
  display: flex;
  flex-direction: column;

  .location-selection {
    padding-top: 20px;
    padding-bottom: 10px;
  }

  .heatmap {
    padding: 20px 20px 40px 20px;
    flex: 1 1 0;
    width: 1000px;
    max-width: 100%;
    margin: auto;
    #map {
      height: 100%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      border-radius: 4px;
    }
  }
}
</style>
