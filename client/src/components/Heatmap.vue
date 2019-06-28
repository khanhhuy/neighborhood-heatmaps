<template>
  <div class="heatmap-wrapper">
    <location-selection class="flex-0"></location-selection>
    <div class="heatmap">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>

import LocationSelection from "./LocationSelection.vue";

const CITIES = ["Munich", "Hamburg", "Frankfurt", "Berlin"];

export default {
  name: "Heatmap",
  components: {
    LocationSelection
  },
  data() {
    return {
      currentCity: CITIES[0],
      shownMenu: false,
      cities: CITIES
    };
  },
  methods: {
    openMenu() {
      this.shownMenu = !this.shownMenu;
    },
    selectCity(city) {
      this.currentCity = city;
      this.shownMenu = false;
    },
    init() {
      let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.heatmap-wrapper {
  display: flex;
  flex-direction: column;

  .heatmap {
    padding: 20px;
    flex: 1 1 0;
    width: 1000px;
    max-width: 100%;
    margin: auto;
    #map {
      height: 100%;
    }
  }
}
</style>
