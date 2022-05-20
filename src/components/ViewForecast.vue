<template>
  <section class="forecast section">
    <div class="container">
      <div class="forecast__heading">
        <h2 class="heading">
          Прогноз
        </h2>

        <app-tabs-nav
          v-model="activeTab"
          :tabs="tabs"
          class="forecast__tabs"
        />
      </div>

      <div class="forecast__content">
        <component :is="activeTab" />
      </div>
    </div>
  </section>
</template>

<script>
import AppTabsNav from "./AppTabsNav.vue";
import TabDaily from "./TabDaily.vue";
import TabHourly from "./TabHourly.vue";

export default {
  name: "ViewForecast",
  components: {
    AppTabsNav,
    TabDaily,
    TabHourly,
  },
  data() {
    return {
      activeTab: "tab-daily",
      tabs: [
        {
          text: "на неделю",
          component: "tab-daily",
        },
        {
          text: "почасовой",
          component: "tab-hourly",
        },
      ],
    };
  },
};
</script>

<style scoped>
.forecast__tabs {
  max-width: 260px;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
}

@media screen and (min-width: 700px) {
  .forecast__content {
    margin-left: -10px;
    margin-right: -10px;
  }
}

@media screen and (min-width: 912px) {
  .forecast__content {
    margin-left: -48px;
    margin-right: -48px;
  }

  .forecast__heading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .forecast__tabs {
    margin-left: 24px;
  }
}
</style>

<style>
.forecast__content .slider {
  max-width: 260px;
  margin-right: auto;
  margin-left: auto;
}

@media screen and (max-width: 699px) {
  .forecast__content .slider__container {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .forecast__content .slider__btn {
    display: none;
  }

  .forecast__content .slide {
    margin-left: 0 !important;
    margin-bottom: 30px;
  }

  .forecast__content .slide:last-child,
  .forecast__content .slide:nth-last-child(2) {
    margin-bottom: 0px;
  }
}

@media screen and (min-width: 700px) {
  .forecast__content .slider {
    max-width: 100%;
    padding-left: 48px;
    padding-right: 48px;
  }
}
</style>