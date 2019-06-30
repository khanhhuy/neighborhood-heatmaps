<template>
  <div class="top-header">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          Neighborhood Heatmap
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-text" target="_blank" href="https://github.com/khanhhuy/neighborhood-heatmaps">
                <i class="fab fa-github"></i>
                <strong class="margin-left-5">Github</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  props: {
    msg: String
  }
};
</script>

<style lang="scss" scoped>

  @import "../stylesheet/var.scss";

  .top-header {
    .navbar-brand {
      .navbar-item {
        color: $brand;
      }
    }
  }
</style>
