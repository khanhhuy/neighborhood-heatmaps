<template>
  <div class="location-selection">
    <span class="is-size-3 location-type">Restaurants distribution in</span>
    <div class="location-dropdown">
      <a
        class="location-selected is-size-3 has-text-weight-semibold"
        @click.prevent="openMenu"
      >{{currentCity}}</a>
      <ul v-show="shownMenu" class="location-menu">
        <li
          class="city-item"
          :class="{'active': city == currentCity}"
          @click="selectCity(city)"
          v-for="city in cities"
          :key="city"
        >{{city}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const CITIES = ["Munich", "Hamburg", "Frankfurt", "Berlin"];

export default {
  name: "Heatmap",
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
    }
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
