<template>
  <header>
    <div class="header-right">
      <p class="main__title">Manage Employees</p>
      <button @click="OpenFilter" class="filterBtn">Filter</button>
    </div>
    <div class="header-left">
      <button class="delete" @click="openDelete">
        <router-link to="/employees" class-active="active">
          <i
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
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM7 13H17V11H7V13Z"
                fill="white"
              />
            </svg>
          </i>
          Delete</router-link
        >
      </button>
      <button class="submit" @click="openModal">
        <router-link to="" class-active="active"
          ><i
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
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18Z"
                fill="white"
              />
            </svg>
          </i>
          Add New Employee</router-link
        >
      </button>
    </div>
    <base-dialog v-if="isModal" mode="dialog">
      <transition name="modal">
        <user-form @save-data="submit" @close-modal="close"></user-form>
      </transition>
    </base-dialog>
  </header>
</template>

<script>
import BaseDialog from "./UI/BaseDialog";
import UserForm from "./userForm";
import "firebase/compat/database";
export default {
  data() {
    return {
      isModal: false,
    };
  },
  components: {
    BaseDialog,
    UserForm,
  },

  methods: {
    OpenFilter() {
      this.$emit("open-filter");
    },
    openModal() {
      this.isModal = true;
    },
    submit(data) {
      this.$store.dispatch("addUser", data);
      this.isModal = false;
    },

    close() {
      this.isModal = false;
    },


    openDelete () {
      this.$emit('delete-all')
    }
  },
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  background: #43438b;
  align-items: center;
  padding: 14px 28px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

p {
  margin: 0;
}
.main__title {
  color: #fff;
  font-weight: 500;
}

a {
  color: #1d3557;
  text-decoration: none;
}
.filterBtn {
  position: absolute;
  left: 173px;
  top: 20px;
  cursor: pointer;
  padding: 6px 27px;
  font-weight: 600;
  border: 1px solid #fff;
  background: #2a3c58;
  color: #fff;
  border-radius: 8px;
}

.submit {
  background: #2ecc71;
  color: #fff;
  font-weight: 600;
  padding: 5px;
  border: none;
  margin-right: 10px;
  cursor: pointer;
}

button a {
  color: #fff;
  display: flex;
  align-items: center;
}

.modal-enter-active {
  animation: modal 1s ease-out;
}

.modal-leave-active {
  animation: modal 1s ease-in;
}

@keyframes modal {
  from {
    transform: scale(0.7);
  }

  to {
    transform: translate(1);
  }
}
.delete {
  background: #e74c3c;
  color: #fff;
  font-weight: 600;
  padding: 5px;
  border: none;
  margin-right: 10px;
}
</style>
