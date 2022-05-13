<template>
  <ul class="history">
    <li 
      v-for="(item, i) in history"
      :key="i"
      class="history__item"
      @click="changeCity(item)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "SearchHistoryComponent",
  setup() {
    const store = useStore();
    return {
      history: computed(() => store.state.history),
      changeCity: (city) => store.commit('changeCity', city),
    };
  },
};
</script>

<style scoped>
.history {
  margin-top: 30px;
}

.history__item {
  position: relative;
  padding: 22px 24px;
  padding-right: 50px;
  font-weight: 700;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  word-break: break-all;
  transition: background-color 0.5s;
}

.history__item::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 24px;
  margin-top: -8px;
  width: 12px;
  height: 16px;
  background-image: url("../assets/img/history-corner.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  opacity: 0;
  transition: opacity 0.5s;
}

.history__item:hover {
  background-color: var(--color-switch);
}

.history__item:hover::after {
  opacity: 1;
}

.history__item+.history__item {
  margin-top: 10px;
}

.theme-dark .history__item:hover {
  background-color: var(--color-main-bg);
}
</style>