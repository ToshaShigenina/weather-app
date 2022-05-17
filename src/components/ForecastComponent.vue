<template>
  <section class="forecast">
    <div class="container">
      <h2 class="heading">
        Прогноз
      </h2>

      <tabs-nav-compoonent
        v-model="activeTab"
        :tabs="tabs"
        class="forecast__tabs"
      />
      <div>
        <component :is="activeTab" />
      </div>
    </div>
  </section>
</template>

<script>
import TabsNavCompoonent from "./TabsNavComponent.vue";
import DailySlider from "./ForecastDailyComponent.vue";
import HourlySlider from "./ForecastHourlyComponent.vue";

export default {
  name: "ForecastComponent",
  components: {
    TabsNavCompoonent,
    DailySlider,
    HourlySlider,
  },
  data() {
    return {
      activeTab: "daily-slider",
      tabs: [
        {
          text: "на неделю",
          component: "daily-slider",
        },
        {
          text: "почасовой",
          component: "hourly-slider",
        },
      ],
    };
  },
};
</script>

<style scoped>
.forecast {
  padding: 60px 0 30px;
}
</style>