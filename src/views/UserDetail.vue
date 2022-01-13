<template>
  <div class="userDetail">
    <h1>{{ selectedUser.gender }}</h1>
    <h1>{{ selectedUser.email }}</h1>
  </div>
</template>

<script>
export default {
  props: ["id"],

  data() {
    return {
      selectedUser: null,
    };
  },

  mounted() {
    this.selectedUser = this.$store.getters.users.find(
      (user) => user.id === this.id
    );
  },
};
</script>

<style></style>
