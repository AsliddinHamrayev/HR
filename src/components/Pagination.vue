<template>
  <div class="card text-center m-3">
    <h3 class="card-header">Vue.js Pagination Tutorial & Example</h3>
    <input type="text" v-model="search" placeholder="search Item" />
    <div class="card-body">
      <div v-for="item in pageOfItems" :key="item.id">{{ item.name }}</div>
    </div>
    <div class="card-footer pb-0 pt-3">
      <jw-pagination
        v-if="filteredBlogs.length"
        :items="filteredBlogs"
        @changePage="onChangePage"
      ></jw-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      exampleItems: [],
      pageOfItems: [],
      search: "",
    };
  },
  computed: {
    filteredBlogs: function () {
      return this.exampleItems.filter((exampleItems) => {
        return exampleItems.name.match(this.search);
      });
    },
  },
  mounted() {
    // an example array of items to be paged
    this.exampleItems = this.$store.getters.users;
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
  },
};
</script>
