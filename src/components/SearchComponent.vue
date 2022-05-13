<template>
  <aside 
    class="search" 
    :class="{ _open: open }"
  >
    <button 
      class="btn_close btn search__btn" 
      type="button"
      @click="$emit('search-close', false)"
    />
    <form
      class="serch__form"
      @submit.prevent="submitForm(city)"
    >
      <input 
        type="text" 
        :value="city" 
        class="input search__input"
      >
      <button
        type="submit" 
        class="search__submit btn"
      >
        Найти
      </button>
      <!-- <p class="search__error">
        Упс! Город не найден,<br>
        попробуйте другой
      </p> -->
    </form>
    <history-component />
  </aside>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import HistoryComponent from './SearchHistoryComponent.vue';

export default {
  name: "SearchComponent",
  components: { HistoryComponent },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const submitForm = (city) => {
      console.log(city);
    }
    return {
      city: computed(() => store.state.city),
      submitForm
    };
  },
  data() {
    return {
      errors: [
        {
          type: "search",
          msg: "Упс! Город не найден, попробуйте другой",
        },
        {
          type: "load",
          msg: "Что-то пошло не так! Перезагрузите страницу.",
        },
      ],
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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  display: none;
  color: var(--color);
  margin-top: 10px;
  width: 100%;
}

.search__submit {
  margin-top: 20px;
  padding: 16px 22px;
  order: 1;
}

.search._open {
  transform: translateX(0);
}

@media screen and (min-width: 700px) {
  .search {
    width: 45%;
  }
}

@media screen and (min-width: 1024px) {
  .search {
    width: 34%;
  }

  .search__input {
    flex-basis: calc(100% - 130px);
  }

  .search__submit {
    margin-top: 0;
    margin-left: 22px;
    order: 0;
  }
}

@media screen and (min-width: 1200px) {
  .search {
    width: 32%;
  }
}
</style>