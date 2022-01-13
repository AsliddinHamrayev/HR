<template>
  <button :class="mode" :type="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["mode", "type"],
};
</script>

<style scoped>
button {
  cursor: pointer;
}

.nav__btn,
.delete {
  background: #2ecc71;
  color: #fff;
  font-weight: 600;
  padding: 5px;
  border: none;
  margin-right: 10px;
}
.delete {
  background: #e74c3c;
}

.submit {
  display: block;
  text-align: center;
  margin-left: 85%;
  padding: 10px 40px;
  font-weight: 600;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
  background: #1d71e1;
  color: #fff;
}

button a {
  color: #fff;
  display: flex;
  align-items: center;
}

.close {
  position: absolute;
  right: 10px;
  top: 10px;
  background: transparent;
  border: none;
}
</style>
