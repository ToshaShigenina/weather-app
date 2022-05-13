<template>
  <section class="sidebar">
    <search-component 
      class="sidebar__search"
      :open="open"
      @search-close="toggleSearch(false)"
    />
    <button 
      class="sidebar__btn btn" 
      type="button"
      @click="toggleSearch(true)"
    >
      Поиск города
    </button>
    <theme-toggler-component class="sidebar__toggler" />
    <div class="sidebar__container">
      <condition-component class="sidebar__condition" />
      <date-component class="sidebar__date" />
      <location-component class="sidebar__location" />
    </div>
  </section>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import SearchComponent from "./SearchComponent.vue";
import ThemeTogglerComponent from "./ThemeTogglerComponent.vue";
import ConditionComponent from "./SidebarConditionComponent.vue";
import DateComponent from "./SidebarDateComponent.vue";
import LocationComponent from "./SidebarLocationComponent.vue";

export default {
  name: "SidebarComponent",
  components: {
    SearchComponent,
    ThemeTogglerComponent,
    ConditionComponent,
    DateComponent,
    LocationComponent,
  },
  setup() {
    const store = useStore();
    const open = ref(false);
    const toggleSearch = (val) => {
      open.value = val;
    };
    return {
      open,
      toggleSearch,
      city: computed(() => store.state.city),
    };
  },
};
</script>

<style scoped>
.sidebar {
  --color-bg: var(--color-white);
  position: relative;
  background-color: var(--color-bg);
  overflow-x: hidden;
  min-height: 100vh;
}

.sidebar__container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.sidebar__btn {
  position: relative;
  z-index: 10;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
}

.sidebar__condition {
  margin-top: 10px;
}

.sidebar__date {
  margin: 0 auto;
  margin-top: 50px;
}

.sidebar__location {
  margin: 25px auto 25px;
}
@media screen and (min-width: 700px) and (max-width: 766px) {
  .sidebar__btn {
    padding-left: 24px;
    padding-right: 24px;
  }
}
@media screen and (min-width: 700px) {
  .sidebar {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 45vw;
    height: 100%;
    overflow-y: scroll;
    flex-grow: 1;
  }

  .sidebar__container {
    min-height: 90vh;
  }
}
@media screen and (min-width: 1024px) {
  .sidebar {
    width: 34vw;
  }
}
@media screen and (min-width: 1200px) {
  .sidebar {
    width: 32vw;
  }
}
</style>