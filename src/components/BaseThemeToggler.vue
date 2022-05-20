<template>
  <div class="theme">
    <input 
      id="theme" 
      type="checkbox" 
      name="theme"
      class="theme__checkbox"
      :checked="theme === 'dark'"
      @change="changeTheme"
    >
    <label 
      class="theme__switch" 
      for="theme"
    >
      <div class="theme__switch_item">
        <base-svg-icon 
          class="theme__icon" 
          name="switch"
        />
      </div>
    </label>
  </div>
</template>

<script>
import BaseSvgIcon from "./BaseSvgIcon.vue";
import { ref } from "vue";

export default {
  name: "BaseThemeToggler",
  components: {
    BaseSvgIcon,
  },
  setup() {
    const theme = ref(localStorage.getItem("theme"));

    const changeTheme = () => {
      if (theme.value === "dark") {
        theme.value = "light";
        document.body.classList.remove("theme-dark");
      } else {
        theme.value = "dark";
        document.body.classList.add("theme-dark");
      }
      localStorage.setItem("theme", theme.value);
    };
    return { theme, changeTheme };
  },
  created() {
    const theme = localStorage.getItem("theme") || "light";
    if (!localStorage.getItem("theme")) localStorage.setItem("theme", theme);
    if (theme === "dark") document.body.classList.add("theme-dark");
  },
};
</script>

<style scoped>
.theme {
  --color-bg: var(--color-white);
  --color-bg-switch: var(--color-main-dark);
  --color: var(--color-switch);
  --color-border: var(--color-main-light);
  position: absolute;
  z-index: 10;
  top: 40px;
  right: 30px;
}

.theme__checkbox {
  display: none;
}

.theme__switch {
  position: relative;
  cursor: pointer;
  display: block;
  width: 64px;
  height: 32px;
  background-color: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  transition: background-color 0.5s;
}

.theme__switch_item {
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  background-color: var(--color-bg-switch);
  border-radius: 50%;
  top: 4px;
  left: 4px;
  transition: all 0.5s;
}

.theme__icon {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 13px;
  height: 13px;
  fill: var(--color);
}

.theme__checkbox:checked+.theme__switch {
  --color-bg: var(--color-theme-dark-main);
  --color-bg-switch: var(--color-accent);
  --color: var(--color-theme-dark-main);
}

.theme__checkbox:checked+.theme__switch>.theme__switch_item {
  transform: translateX(32px);
}
</style>