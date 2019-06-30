<template>
  <div class="location-selection">
    <span class="is-size-3 location-type">Restaurants distribution in</span>
    <div class="location-dropdown" v-if="cities.length != 0">
      <a
        class="location-selected is-size-3 has-text-weight-semibold"
        @click.prevent="openMenu"
      >{{currentCity.name}}</a>
      <ul v-show="shownMenu" class="location-menu">
        <li
          class="city-item"
          :class="{'active': city.id == currentCity.id}"
          @click="selectCity(city.id)"
          v-for="city in cities"
          :key="city.id"
        >{{city.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import PlacesApi from '../services/PlacesApi';
import _ from 'lodash';

export default {
  name: "LocationSelection",
  data() {
    return {
      currentCity: null,
      shownMenu: false,
      cities: []
    };
  },
  methods: {
    openMenu() {
      this.shownMenu = !this.shownMenu;
    },
    selectCity(cityId) {
      this.currentCity = _.find(this.cities, (city) => city.id === cityId);
      this.shownMenu = false;
      this.$emit('input', cityId);
    },
    async init() {
      const cities = await PlacesApi.fetchCities();
      this.cities = cities;
      this.currentCity = cities[0];
      this.$emit('input', this.currentCity.id);
    }
  },
  mounted () {
    this.init();
  }
};
</script>

<style lang="scss" scoped>

  @import "../stylesheet/var.scss";

.location-selection {
  z-index: 100;
  flex: 0 0 auto;
  text-align: center;
  margin-right: 80px;

  .location-dropdown {
    position: relative;
    display: inline;

    .location-selected {
      color: #333;
      border-bottom: 3px solid $brand-2;
      position: absolute;
      left: 5px;
    }

    ul.location-menu {
      text-align: left;
      position: absolute;
      top: 36px;
      left: 4px;
      width: 220px;
      min-height: 150px;
      overflow: auto;
      background: #fff;

      border-radius: 4px;
      box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.1);

      padding: 8px 0;

      li.city-item {
        padding: 5px 10px;
        cursor: pointer;
        &:hover {
          background: #eeeeee;
        }
        &.active {
          background: $brand-2;
          color: #fff;
        }
      }
    }
  }
}
</style>
