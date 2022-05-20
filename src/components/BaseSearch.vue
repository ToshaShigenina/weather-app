<template>
  <aside 
    class="search" 
    :class="{ _open: open }"
  >
    <button 
      class="btn_close btn search__btn" 
      type="button"
      @click="openSearch"
    />
    <form
      class="serch__form"
      @submit.prevent="submitForm(search)"
    >
      <input 
        v-model="search"
        type="text" 
        class="input search__input"
      >
      <button
        type="submit" 
        class="search__submit btn"
      >
        Найти
      </button>
      <p 
        v-if="error"
        class="search__error"
      >
        {{ error }}
      </p>
    </form>
    <slot name="history" />
  </aside>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "BaseSearch",
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["search-close"],
  setup(_, { emit }) {
    const store = useStore();
    const isLoad = computed(() => store.state.isLoad);
    const error = computed(() => store.getters.getError);
    const history = computed(() => store.getters.getHistoryReverse);
    const search = computed({
      get: () => store.getters.getSearch,
      set: (val) => store.commit("setSearch", val),
    });
    const loadData = () => store.dispatch("loadData");
    const openSearch = () => {
      emit('search-close', false);
    };
    const submitForm = () => {
      if (search.value !== history.value[0]) loadData();
    };
    
    return {
      isLoad,
      search,
      submitForm,
      error,
      openSearch
    };
  },
};
</script>

<style scoped>
.search {
  --color-bg: var(--color-white);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  padding: 30px;
  background-color: var(--color-bg);
  transform: translateX(-100%);
  transition: transform 0.5s;
  z-index: 100;
}

.serch__form {
  width: 100%;
  margin-top: 40px;
}

.search__btn {
  margin-right: 0;
  margin-left: auto;
}

.search__input {
  --color-bg: var(--color-white);
  --color-border: var(--color-main-light);
  --color: var(--color-main-dark);
  --radius: 10px;
  --border-width: 2px;
  display: block;
  width: 100%;
  padding: 16px;
  padding-left: 44px;
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius);
  background-color: var(--color-bg);
  color: var(--color);
  font-weight: 700;
  font-size: 18px;
  background-image: url("../assets/img/search.svg");
  background-size: 18px;
  background-repeat: no-repeat;
  background-position: center left 14px;
}

.search__error {
  --color: var(--color-error);
  color: var(--color);
  margin-top: 10px;
  width: 100%;
}

.search__submit {
  display: block;
  margin: 20px auto 0;
  padding: 16px 22px;
}

.search._open {
  transform: translateX(0);
}

@media screen and (min-width: 700px) {
  .search {
    width: 45%;
  }
}

@media screen and (min-width: 912px) {
  .search {
    width: 40%;
  }
}

@media screen and (min-width: 1024px) {
  .search {
    width: 34%;
  }
}

@media screen and (min-width: 1200px) {
  .search {
    width: 32%;
  }
}
</style>