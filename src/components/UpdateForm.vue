<template>
  <div class="addUser">
    <h1 class="main__title">Edit Employee's detail</h1>
    <p class="error" v-if="!formIsValid">Please fix all the errors</p>
    <form action="" class="form-add" @submit.prevent="submit">
      <button class="close" type="button" @click="close">X</button>
      <div class="name" :class="{ invalid: !name.isValid }">
        <label for="fname">First Name</label>
        <input
          type="text"
          name=""
          id="fname"
          class="input"
          placeholder="your name"
          v-model.trim="name.val"
        />
        <p v-if="!name.isValid">First name must not be empty</p>
      </div>
      <div class="name" :class="{ invalid: !LastName.isValid }">
        <label for="lastname">Last Name</label>
        <input
          type="text"
          name=""
          id="lastname"
          class="input"
          placeholder="your last name"
          v-model.trim="LastName.val"
        />
        <p v-if="!LastName.isValid">Last name must not be empty</p>
      </div>
      <div class="name" :class="{ invalid: !number.isValid }">
        <label for="number">Phone number</label>
        <input
          type="tel"
          id="number"
          name="phone"
          maxlength="16"
          class="input"
          placeholder="99 675 32 11"
          v-model="number.val"
        />
        <p v-if="!number.isValid">Number must not be empty</p>
      </div>
      <div class="name" :class="{ invalid: !email.isValid }">
        <label for="email">Email</label>
        <input
          type="email"
          name=""
          id="email"
          class="input"
          placeholder="your email"
          v-model="email.val"
        />
        <p v-if="!email.isValid">Email must not be empty</p>
      </div>
      <div class="name radio-box" :class="{ invalid: !gender.isValid }">
        <label for="woman">Woman</label>
        <input
          type="radio"
          name="gender"
          id="woman"
          value="Woman"
          class="input__radio"
          v-model="gender.val"
        />
        <label for="man">Man</label>
        <input
          type="radio"
          name="gender"
          id="man"
          value="Man"
          class="input__radio"
          v-model="gender.val"
        />
        <p v-if="!gender.isValid">Choose on of them</p>
      </div>
      <div class="name" :class="{ invalid: !department.isValid }">
        <select class="input" v-model="department.val">
          <option value="Accaounting">Accaounting</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
        </select>
        <p v-if="!department.isValid">department must not be empty</p>
      </div>
      <div class="name" :class="{ invalid: !position.isValid }">
        <label for="position">Current position</label>
        <input
          type="text"
          name=""
          id="position"
          class="input"
          placeholder="Your current position"
          v-model="position.val"
        />
        <p v-if="!position.isValid">Position must not be empty</p>
      </div>
      <div class="name" :class="{ invalid: !date.isValid }">
        <label for="date">Date of birth</label>
        <input
          type="tel"
          maxlength="16"
          name=""
          id="date"
          class="input"
          v-model="date.val"
        />
        <p v-if="!date.isValid">Date must not be empty</p>
      </div>
      <base-button mode="submit" type="submit">✓ Update</base-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: {
        val: "",
        isValid: true,
      },
      LastName: {
        val: "",
        isValid: true,
      },
      number: {
        val: "",
        isValid: true,
      },
      email: {
        val: "",
        isValid: true,
      },
      gender: {
        val: null,
        isValid: true,
      },
      department: {
        val: "",
        isValid: true,
      },
      position: {
        val: "",
        isValid: true,
      },
      date: {
        val: "",
        isValid: true,
      },
      formIsValid: {
        val: "",
        isValid: true,
      },
    };
  },

  props: ["UserDetailModal"],
  methods: {
    submit() {
      const formData = {
        name: this.name.val,
        LastName: this.LastName.val,
        number: this.number.val,
        email: this.email.val,
        gender: this.gender.val,
        department: this.department.val,
        position: this.position.val,
        date: this.date.val,
        id: this.UserDetailModal.id,
      };
      this.$emit("update-data", formData);
    },

    close() {
      this.$emit("close-modal");
    },

    fillInputs() {
      this.name.val = this.UserDetailModal.name;
      this.LastName.val = this.UserDetailModal.LastName;
      this.number.val = this.UserDetailModal.number;
      this.email.val = this.UserDetailModal.email;
      this.gender.val = this.UserDetailModal.gender;
      this.department.val = this.UserDetailModal.department;
      this.position.val = this.UserDetailModal.position;
      this.date.val = this.UserDetailModal.date;
    },

    handleUserInput() {
      let x = this.number.val
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,3})(\d{0,4})/);

      this.number.val = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },

    DateHandler() {
      let x = this.date.val
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,2})(\d{0,2})/);

      this.date.val = !x[2]
        ? x[1]
        : x[1] + "/" + x[2] + (x[3] ? "/" + x[3] : "");
    },
  },

  created() {
    this.fillInputs();
  },
};
</script>

<style>
.form-add {
  max-width: 938px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  background: #f7f7f7;
  padding: 28px;
  border-radius: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.43);
  flex-wrap: wrap;
}

.name {
  width: 368px;
}
form {
  position: relative;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.input {
  padding: 12px;
  width: 85%;
  border-radius: 10px;
  border: 1px solid #c3c3c3;
  margin-top: 12px;
  margin-bottom: 12px;
  outline: none;
}

label {
  text-align: left;
  font-weight: 500;
}

.radio-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}
</style>
