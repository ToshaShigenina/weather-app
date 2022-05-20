<template>
  <ul class="tabs">
    <li 
      v-for="item in tabs" 
      :key="item.component" 
      class="tabs__item"
    >
      <button
        class="tabs__btn"
        :class="{ _active: item.component === modelValue }"
        @click="toTab(item.component)"
      >
        {{ item.text }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppTabsNav",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    toTab(component) {
      if (this.activeTab !== component) {
        this.$emit("update:modelValue", component);
      }
    },
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: space-between;
  list-style: none;
}

.tabs__item:first-child {
  margin-right: 20px;
}

.tabs__btn {
  --color: var(--color-main-light);
  --color-border: transparent;
  display: block;
  flex-shrink: 0;
  border: none;
  border-radius: 0;
  background-color: transparent;
  padding-bottom: 10px;
  border-bottom: 4px solid var(--color-border);
  color: var(--color);
  font-weight: 700;
  font-size: 20px;
  line-height: 1;
  white-space: nowrap;
}

.tabs__item .tabs__btn._active {
  --color: var(--color-main-dark);
  --color-border: var(--color-main-dark);
}

@media screen and (min-width: 700px) {
  .tabs__item:first-child {
    margin-right: 30px;
  }
}
</style>