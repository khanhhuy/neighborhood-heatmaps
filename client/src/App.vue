<template>
  <div id="app" class="flex-container-column">
    <top-header class="flex-0"></top-header>
    <heatmap class="flex-full"></heatmap>
  </div>
</template>

<script>
import TopHeader from "./components/TopHeader.vue";
import Heading from "./components/Heading.vue";
import Heatmap from "./components/Heatmap.vue";

export default {
  name: "app",
  components: {
    TopHeader,
    Heading,
    Heatmap
  }
};
</script>

<style lang="sass">

  @import "~bulma/sass/utilities/_all.sass"
  @import "~bulma/sass/base/_all.sass"
  @import "~bulma/sass/components/navbar.sass"
  @import "~bulma/sass/elements/_all.sass"
  @import "~bulma/sass/grid/_all.sass"

</style>


<style lang="scss">
// Global styles

html,
body {
  height: 100%;
}

#app {
  height: 100%;
  background: #f6f9fc;
}

::-webkit-scrollbar {
  width: 3px;
}

::-webkit-scrollbar-thumb {
  background: #dedede;
}

.flex-container-row {
  display: flex;
  flex-direction: row;
}

.flex-container-column {
  display: flex;
  flex-direction: column;
}

.flex-full {
  flex: 1 1 0;
}

.flex-0 {
  flex: 0 0 auto;
}
</style>
