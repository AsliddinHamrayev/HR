<template>
  <div>
    <div class="user-list">
      <base-dialog mode="dialog" v-if="isModal">
        <UpdateForm
          @close-modal="close"
          @update-data="submit"
          :UserDetailModal="UserDetailModal"
        ></UpdateForm>
      </base-dialog>

      <div class="users" v-else-if="noUser">
        <div class="list-header">
          <h3 class="list__title">Photo</h3>
          <h3 class="list__title">Name</h3>
          <h3 class="list__title">Mobile</h3>
          <h3 class="list__title">Email</h3>
          <h3 class="list__title">Department</h3>
          <h3 class="list__title">Actions</h3>
        </div>
        <div class="loader" v-if="isLoading">
          <base-loading></base-loading>
        </div>
        <transition-group name="userAnimation">
          <div v-for="user in pageOfItems" :key="user.id">
            <transition name="userEnter">
              <div class="user">
                <div class="width img">
                  <img
                    src="../assets/User_circle.png"
                    alt=""
                    class="user__img"
                  />
                </div>
                <router-link :to="{ name: 'Detail', params: { id: user.id } }">
                  <div class="width">
                    <h4 class="list__title">{{ user.name }}</h4>
                  </div>
                </router-link>
                <div class="width">
                  <h4 class="list__title">{{ user.number }}</h4>
                </div>
                <div class="width">
                  <h4 class="list__title">{{ user.email }}</h4>
                </div>
                <div class="width">
                  <h4 class="list__title">{{ user.department }}</h4>
                </div>
                <div class="width">
                  <h3 class="list__title actions">
                    <i class="i__delete" @click="removeUser(user)"
                      ><svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          fill="#7E869E"
                          fill-opacity="1"
                        />
                        <path d="M8 12H16" stroke="white" stroke-width="1.2" />
                      </svg>
                    </i>
                    <i class="i__edit" @click="openModal(user)"
                      ><svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.204 10.796L19 9C19.5453 8.45475 19.8179 8.18213 19.9636 7.88803C20.2409 7.32848 20.2409 6.67153 19.9636 6.11197C19.8179 5.81788 19.5453 5.54525 19 5C18.4548 4.45475 18.1821 4.18213 17.888 4.03639C17.3285 3.75911 16.6715 3.75911 16.112 4.03639C15.8179 4.18213 15.5453 4.45475 15 5L13.1814 6.81866C14.1452 8.46926 15.5314 9.84482 17.204 10.796ZM11.7269 8.27312L4.8564 15.1436C4.43134 15.5687 4.21881 15.7812 4.07907 16.0423C3.93934 16.3034 3.88039 16.5981 3.7625 17.1876L3.1471 20.2646C3.08058 20.5972 3.04732 20.7635 3.14193 20.8581C3.23654 20.9527 3.40284 20.9194 3.73545 20.8529L6.81243 20.2375C7.40189 20.1196 7.69661 20.0607 7.95771 19.9209C8.21881 19.7812 8.43134 19.5687 8.8564 19.1436L15.7458 12.2542C14.1241 11.2386 12.7524 9.87628 11.7269 8.27312Z"
                          fill="white"
                        />
                      </svg>
                    </i>
                  </h3>
                </div>
              </div>
            </transition>
          </div>
        </transition-group>
      </div>
    </div>
    <div
      class="drop-down"
      :class="{ Active: Active }"
      @click="Active = !Active"
    >
      <input
        type="text"
        class="textBox"
        placeholder="Number of Items per page"
        readonly
        v-model="page"
      />
      <div class="option">
        <div class="select" @click="show(5)">5</div>
        <div class="select" @click="show(10)">10</div>
        <div class="select" @click="show(25)">25</div>
        <div class="select" @click="show(50)">50</div>
      </div>
    </div>

    <jw-pagination
      v-if="items.length"
      :items="items"
      @changePage="onChangePage"
      :styles="customStyles"
      :labels="customLabels"
      :pageSize="pageSize"
    ></jw-pagination>
    <!--    <button @click="generate">Generate</button>-->
  </div>
</template>

<script>
import UpdateForm from "./UpdateForm";

const customStyles = {
  ul: {
    position: "absolute",
    right: "0px",
    margin: "16px 3px",
  },
  a: {
    display: "unset",
    float: "none",
  },

  active: {
    padding: "10px",
    background: "black",
  },
};

const customLabels = {
  first: "",
  last: "",
  previous: "Previous",
  next: "Next",
};
export default {
  components: { UpdateForm },
  props: ["values", "items"],
  data() {
    return {
      isLoading: false,
      activeFilters: {
        man: true,
        woman: true,
      },
      pageOfItems: [],
      customStyles,
      customLabels,
      edit: false,
      pageSize: 5,
      isModal: false,
      page: "",
      Active: false,
      UserDetailModal: {},
    };
  },
  computed: {
    noUser() {
      return !this.isLoading && this.$store.getters.hasUser;
    },
  },
  methods: {
    openModal(id) {
      this.UserDetailModal = id;
      this.isModal = true;
    },

    close() {
      this.isModal = false;
      this.isFilter = false;
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    removeUser(id) {
      this.$emit('remove-user', id)
    },

    show(num) {
      this.page = num;
      this.pageSize = num;
      this.loadUserss()
    },

    async loadUserss() {
      this.isLoading = true;
      await this.$store.dispatch("loadUsers").then((res) => {
        this.items = res;
      });
      console.log(this.items);
      this.isLoading = false;
    },

    submit(data) {
      this.$store.dispatch("EditUser", data);
      this.isModal = false;
      setTimeout(function () {
        window.location.reload();
      }, 700);
    },
  },
};
</script>

<style scoped>
.img {
  width: 90px;
  text-align: left;
}

.list__title {
  font-size: 12px;
  margin: 0;
  width: 90px;
  text-align: left;
}
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  border-top: 1px solid #e6e6e6;
  padding: 6px 50px 0;
  cursor: pointer;
}

.user-list {
  margin-top: 12px;
}

li .active {
  background-color: #1d3557;
  padding: 10px;
}

.user__img {
  padding: 5px;
  background: #333;
  width: 28px;
  border-radius: 10px;
}

.i__delete svg circle {
  fill: #c24d4d;
}

.i__edit svg path {
  fill: #333;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

button {
  cursor: pointer;
}

.userAnimation-enter-active {
  animation: UserAnimation 0.5s ease-out;
}

.userAnimation-leave-active {
  animation: userLeave 0.2s ease-in;
}

@keyframes UserAnimation {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes userLeave {
  from {
    opacity: 1;
    transform: translateX(0px);
  }
  to {
    opacity: 0;
    transform: translateX(-50px);
  }
}

.drop-down {
  position: absolute;
  width: 158px;
  height: 50px;
}

.drop-down input {
  position: absolute;
  top: 18px;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: #efefef;
  border: none;
  outline: none;
  padding: 0px 20px;
  border-radius: 10px;
  text-align: center;
  z-index: -1;
  cursor: pointer;
}

.option {
  position: absolute;
  bottom: 38px;
  width: 124%;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: none;
}

.option div {
  padding: 12px 20px;
  cursor: pointer;
  background: #d1d1d1;
}

.Active .option {
  display: block;
}

.modal-enter-active {
  animation: ModalEnter 1s ease-out;
}

.modal-leave-active {
  animation: ModalLeave 1s ease-in;
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

.filterBtn {
  position: absolute;
  top: 68px;
  left: 253px;
  padding: 6px 27px;
  font-weight: 600;
  border: 1px solid #fff;
  background: #2a3c58;
  color: #fff;
  border-radius: 8px;
}

.active {
  background-color: #43438b;
}

.list-header {
  display: flex;
  justify-content: space-between;
  padding: 0px 50px;
}

.list {
  padding: 10px;
}

.list__title {
  font-size: 14px;
  margin: 0;
  width: 90px;
  text-align: left;
}
</style>
