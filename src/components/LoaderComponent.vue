<template>
  <div class="loader">
    <div class="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<script>
export default {
  name: "LoaderComponent",
};
</script>

<style scoped>
.loader {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.5s;
}

.lds-ellipsis {
  --color: var(--color-main-light);
  display: inline-block;
  position: relative;
  width: 80px;
  height: 13px;
}

.lds-ellipsis div {
  position: absolute;
  top: 0;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--color);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}


</style>