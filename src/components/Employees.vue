<template>
  <div class="main">
    <transition name="modal">
      <base-dialog v-if="isFilter" mode="forFilter">
        <filter-user
          @close-modal="close"
          @filter-values="filterBtn"
        ></filter-user>
      </base-dialog>
    </transition>

    <transition>
      <base-dialog v-if="isDelete" mode="dialog">
        <delete-modal @delete-all="deleteAll" @close-modal="close"></delete-modal>
      </base-dialog>
    </transition>
    <transition name="main">
      <main id="main">
        <TheHeader @open-filter="openFilter" @delete-all="openDeleteModal"/>
        <div class="loader" v-if="isLoading">
          <base-loading></base-loading>
        </div>
        <user-card :values="values" :items="items" v-else-if="noUser" @remove-user="removeUser"></user-card>
        <h1 v-else>No Users found</h1>
      </main>
    </transition>
  </div>
</template>

<script>
import TheHeader from "./TheHeader.vue";
import FilterUser from "./filterUser";
import UserCard from "./UserCard";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import DeleteModal from "./deleteModal";
export default {
  components: {
    DeleteModal,
    UserCard,
    FilterUser,
    TheHeader,
  },
  data() {
    return {
      isFilter: false,
      values: [],
      items: [],
      isLoading: false,
      filteredItems: [],
      isDelete: false,
    };
  },
  created() {
    this.loadUsers();
  },

  computed: {
    noUser() {
      return !this.isLoading && this.$store.getters.hasUser;
    },
  },
  methods: {
    openFilter() {
      this.isFilter = true;
      this.loadUsers()
    },

    close() {
      this.isModal = false;
      this.isFilter = false;
      this.isDelete = false
    },

    filterBtn(data) {
      this.values = data;
      this.allFilters();
      console.log(data)
      this.isFilter = false;
    },
    async loadUsers() {
      this.isLoading = true;
      await this.$store.dispatch("loadUsers").then((res) => {
        this.items = res;
      });
      console.log(this.items);
      this.isLoading = false;
    },

    removeUser(id) {
      let dUser = firebase.database().ref("users/" + id.id);
      dUser.remove();
      this.loadUsers();
    },

    allFilters() {
      this.items = this.items.filter((item) => {
        return this.filterNames(item) && this.filterDate(item) && this.filterDepartment(item)
      });
      console.log(this.items);
    },

    filterNames(item) {
      return item.name === this.values.name;
    },

    filterDate(item) {
      return item.date >= this.values.RangeMin && item.date <= this.values.RangeMax
    },

    filterDepartment(item) {
      return item.department === this.values.department;
    },

    filterNumber(item) {
      return item.number === this.values.number;
    },

    openDeleteModal(){
      this.isDelete = true
    },

    deleteAll() {
      let DataAll = firebase.database().ref("users");
      DataAll.remove();
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  gap: 5px;
}
main {
  border: 1px solid #f1f1f1;
  min-width: 1000px;
  width: 100%;
  position: relative;
}

label {
  margin-left: 5px;
  cursor: pointer;
}

.modal-enter-active {
  animation: ModalEnter 1s ease-out;
}

.modal-leave-active {
  animation: ModalLeave 1s ease-in;
}

.main-enter-active {
  animation: MainEnter 1s ease-out;
}

.main-leave-active {
  animation: MainEnter 1s ease-in;
}

@keyframes MainEnter {
  from{
    width: 1445px;
  }
  to{
    width: 1000px;
  }
}
@keyframes ModalEnter {
  from {
    opacity: 0;
    transform: translateX(-150px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}



@keyframes ModalLeave {
  from {
    opacity: 1;
    transform: translateX(0px);
  }

  to {
    opacity: 0;
    transform: translateX(-150px);
  }
}
</style>
