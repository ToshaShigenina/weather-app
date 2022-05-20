<template>
  <section class="current section">
    <div class="container">
      <h2 class="heading">
        Подробно на сегодня
      </h2>
      <div class="current__content">
        <div class="row">
          <base-card 
            v-for="card in cards"
            :key="card.class"
            :name="card.name"
            size="lg"
            :show-loader="!current.date"
            class="current__card"
          >
            <span 
              v-if="card.class === 'wind'" 
              class="card__value"
            >
              {{ current.wind_speed }} <small>м/с</small>
            </span>
            <div 
              v-if="card.class === 'wind'" 
              class="wind__value"
            >
              <base-svg-icon 
                :style="{ '--degree': `${current.wind_deg}deg` }"
                name="arrow"
                class="wind__icon"
              />
              {{ windDirection }}
            </div>
            <span 
              v-if="card.class === 'humidity'" 
              class="card__value"
            >
              {{ current.humidity }} <small>%</small>
            </span>
            <span 
              v-if="card.class === 'visibility'" 
              class="card__value"
            >
              {{ current.visibility }} <small>км</small>
            </span>
            <span 
              v-if="card.class === 'pressure'" 
              class="card__value"
            >
              {{ current.pressure }} <small>мм&nbsp;рт.ст.</small>
            </span>
          </base-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import BaseCard from "./BaseCard.vue";
import BaseSvgIcon from "./BaseSvgIcon.vue";

export default {
  name: "ViewCurrent",
  components: {
    BaseCard,
    BaseSvgIcon,
  },
  setup() {
    const store = useStore();
    const current = computed(() => store.state.current);
    const windDirection = computed(() => store.getters.getWindDirection);
    const cards = [
      {
        name: "Скорость ветра",
        class: "wind",
      },
      {
        name: "Влажность",
        class: "humidity",
      },
      {
        name: "Видимость",
        class: "visibility",
      },
      {
        name: "Давление",
        class: "pressure",
      },
    ];

    return {
      cards,
      current,
      windDirection,
    };
  },
};
</script>

<style scoped>
.current__card+.current__card {
  margin-top: 40px;
}

.current__content {
  margin-left: -15px;
  margin-right: -15px;
}

.card__value {
  font-weight: 900;
  font-size: 64px;
}

.card__value small {
  font-size: 40%;
  font-weight: 700;
}

.wind__value {
    display: flex;
    align-items: center;
    justify-content: center;
}

.wind__icon {
  --degree: 0deg;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  transform: rotateZ(var(--degree));
}

@media screen and (max-width: 1199px) {
  .current__content .row {
    justify-content: center;
  }
}

@media screen and (min-width: 1200px) {
  .current__card+.current__card {
    margin-top: 0;
  }

  .current__card:first-child,
  .current__card:nth-child(2) {
    margin-bottom: 40px;
  }

  .current .container {
    max-width: 650px;
  }

}
</style>