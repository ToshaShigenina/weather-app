<template>
  <section class="sidebar">
    <base-search 
      class="sidebar__search"
      :open="open"
      @search-close="toggleSearch(false)"
    >
      <template #history>
        <base-search-history />
      </template>
    </base-search>
    <button 
      class="sidebar__btn btn" 
      type="button"
      @click="toggleSearch(true)"
    >
      Поиск города
    </button>
    <base-theme-toggler class="sidebar__toggler" />
    <transition name="fade">
      <base-loader v-if="isLoad" />
      <div 
        v-else 
        class="sidebar__container"
      >
        <sidebar-condition class="sidebar__condition" />
        <sidebar-date class="sidebar__date" />
        <sidebar-location class="sidebar__location" />
      </div>
    </transition>
  </section>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

import BaseSearch from "./BaseSearch.vue";
import BaseSearchHistory from "./BaseSearchHistory.vue";
import BaseThemeToggler from "./BaseThemeToggler.vue";
import SidebarCondition from "./SidebarCondition.vue";
import SidebarDate from "./SidebarDate.vue";
import SidebarLocation from "./SidebarLocation.vue";
import BaseLoader from "./BaseLoader.vue";

export default {
  name: "ViewSidebar",
  components: {
    BaseSearch,
    BaseSearchHistory,
    BaseThemeToggler,
    SidebarCondition,
    SidebarDate,
    SidebarLocation,
    BaseLoader,
  },
  setup() {
    const store = useStore();
    const open = ref(false);
    const toggleSearch = (val) => {
      open.value = val;
    };
    watch(open, (_, newVal) => {
      if (newVal) {
        document.body.classList.remove("_overflow");
      } else {
        document.body.classList.add("_overflow");
      }
    });
    return {
      open,
      toggleSearch,
      isLoad: computed(() => store.state.isLoad),
    };
  },
};
</script>

<style scoped>
.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
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
    width: 45%;
    height: 100%;
    overflow-y: scroll;
    flex-grow: 1;
  }

  .sidebar__container {
    margin-top: 4vh;
  }
}
@media screen and (min-width: 912px) {
  .sidebar {
    width: 40%;
  }
}
@media screen and (min-width: 1024px) {
  .sidebar {
    width: 34%;
  }
}
@media screen and (min-width: 1200px) {
  .sidebar {
    width: 32%;
  }
}
</style>