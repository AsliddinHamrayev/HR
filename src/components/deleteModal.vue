<template>
  <div class="deleteModal">
    <h2>Your all data will be gone. Do you agree?</h2>
    <button class="delete__btn" @click="deleteAll">Yes</button>
    <button class="delete__btn color__gray" @click="close">No</button>
  </div>
</template>

<script>
export default {
  props:[],

  methods:{
    deleteAll(){
      this.$emit('delete-all')
    },

    close() {
      this.$emit("close-modal");
    },
  },
}
</script>

<style scoped>
.deleteModal {
  padding: 20px;
  background: #fff;
  width: 315px;
  margin: 0 auto;
  position: absolute;
  top: 39%;
  left: 39%;
  border-radius: 6px;
}

.delete__btn {
  padding: 6px 20px;
  border-radius: 3px;
  border: none;
  margin-right: 5px;
  background: red;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.color__gray {
  background: #e6e6e6;
  color: #000;
}
</style>