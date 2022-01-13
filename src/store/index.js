import Vue from "vue";
import Vuex from "vuex";
import employeesModule from "./modules/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users: employeesModule,
  },
});
