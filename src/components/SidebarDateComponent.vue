<template>
  <div class="date">
    <span class="date__item">Сегодня</span>
    <span class="date__item">{{ current.date || new Date().getDay() }}</span>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "SidebarDateComponent",
  setup() {
    const store = useStore();
    return {
      current: computed(() => store.state.current),
    };
  },
};
</script>

<style scoped>
.date {
  --color: var(--color-main-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color);
}

.date__item:first-child {
  margin-right: 70px;
}
</style>