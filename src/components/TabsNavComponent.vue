<template>
    <ul class="label">
        <li v-for="item in tabs" :key="item.component" class="label__item">
            <button
                class="label__btn"
                :class="{ active: item.component === activeTab }"
                @click="toTab(item.component)"
            >
                {{ item.text }}
            </button>
        </li>
    </ul>
</template>

<script>
export default {
  name: "tabs-nav-component",
  props: {
    activeTab: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },
  methods: {
      toTab(component) {
          console.log(component);
      }
  }
};
</script>