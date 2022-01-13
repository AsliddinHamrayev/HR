<template>
  <div :class="mode">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["mode"],
};
</script>

<style>
.dialog {
  position: fixed;
  top: 0vh;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0 0 0 / 50%);
  z-index: 1;
}

.forFilter {
  border: none;
  background-color: transparent;
}
</style>
