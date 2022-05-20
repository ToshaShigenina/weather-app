<template>
  <div class="wrapper">
    <sidebar-component />
    <div class="content">
      <forecast-component />
      <current-component />
    </div>
  </div>
</template>

<script>
import SidebarComponent from "./components/ViewSidebar.vue";
import ForecastComponent from "./components/ViewForecast.vue";
import CurrentComponent from "./components/ViewCurrent.vue";

export default {
  name: "App",
  components: {
    SidebarComponent,
    ForecastComponent,
    CurrentComponent,
  },
  beforeCreate() {
    this.$store.dispatch("initHistory");
    this.$store.dispatch("loadData");
  },
};
</script>
