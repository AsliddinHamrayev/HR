<template>
  <div class="filter">
    <h1 class="filter__title">Filter</h1>
    <button class="close" type="button" @click="close">X</button>
    <form action="" class="form-filter" @submit.prevent="Submit">
      <div class="filter-box">
        <label for="department">Department:</label>
        <select id="department" class="input__department" v-model="department">
          <option value="Accaunting">Accaunting</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <div class="filter-box">
        <label for="number">Number:</label>
        <input
          type="number"
          class="input"
          id="number"
          placeholder="999 999 999"
          v-model="number"
        />
      </div>
      <div class="filter-box">
        <label>Date:</label>
        <div class="range-slider">
          <input
            type="range"
            min="1950"
            max="2050"
            step="1"
            v-model="sliderMin"
          />
          <p>Between {{ sliderMin }} and {{ sliderMax }}</p>

          <input
            type="range"
            min="1950"
            max="2050"
            step="1"
            v-model="sliderMax"
          />
        </div>
      </div>
      <div class="filter-box">
        <label for="name">Name:</label>
        <input
          type="text"
          class="input"
          id="name"
          placeholder="Asliddin"
          v-model="name"
        />
      </div>

      <button type="submit" class="submit">Submit</button>
      <button class="reset__btn" @click="reset">Reset</button>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      minAngle: 1990,
      maxAngle: 2010,
      department: "IT",
      number: 9999,
      name: "Name",
    };
  },

  methods: {
    close() {
      this.$emit("close-modal");
    },

    Submit() {
      const Vals = {
        RangeMax: String(this.maxAngle),
        RangeMin: String(this.minAngle),
        department: this.department,
        number: String(this.number),
        name: this.name,
      };

      this.$emit("filter-values", Vals);
    },

    reset() {
      this.name = "";
      this.department = "";
      this.number = "";
    },
  },

  computed: {
    sliderMin: {
      get: function () {
        let val = parseInt(this.minAngle);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val > this.maxAngle) {
          this.maxAngle = val;
        }
        this.minAngle = val;
      },
    },
    sliderMax: {
      get: function () {
        let val = parseInt(this.maxAngle);
        return val;
      },
      set: function (val) {
        val = parseInt(val);
        if (val < this.minAngle) {
          this.minAngle = val;
        }
        this.maxAngle = val;
      },
    },
  },
};
</script>

<style scoped>
.filter {
  padding: 10px;
  border: 2px solid #43438b;
  width: 335px;
  background: #fff;
  border-radius: 10px;
  text-align: left;
  position: relative;
}

label {
  width: 50px;
  color: #43438b;
}

.input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #43438b;
  outline: none;
  max-width: 200px;
  width: 100%;
}

.filter-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submit {
  display: block;
  text-align: center;
  margin-left: 62%;
  padding: 10px 40px;
  font-weight: 600;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
  background: #1d71e1;
  color: #fff;
}

.form-filter {
  max-width: 430px;
  margin: 0 auto;
}

.filter__title {
  text-align: center;
  font-weight: normal;
  font-size: 28px;
}

/*Range*/
input[type="range"] {
  display: block;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"],
input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  background-color: #fff;
  width: 20px;
  height: 20px;
  border: 3px solid #333;
  border-radius: 50%;
  margin-top: -9px;
}

input[type="range"]::-webkit-slider-runnable-track {
  background-color: #000;
  height: 3px;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
  outline: none;
}

.range-slider {
  width: 222px;
  text-align: center;
  position: relative;
  height: 2em;
}

.range-slider input[type="range"] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
}

input[type="range"]:focus {
  outline: none;
  border: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  background: #eee;
  box-shadow: none;
  border: 0;
}

input[type="range"]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: none;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 25px;
  background: #444;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5px;
}

.input__department {
  padding: 10px;
  width: 100%;
  max-width: 222px;
  border-radius: 10px;
  border: 1px solid #43438b;
  outline: none;
}
</style>
