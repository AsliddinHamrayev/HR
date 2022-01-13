import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseLoading from "./components/UI/BaseSpinner";
import JwPagination from "jw-vue-pagination";
import firebase from "firebase/compat/app";
import BaseDialog from "./components/UI/BaseDialog.vue";

const firebaseConfig = {
  apiKey: "AIzaSyB7inBNvr7hH1L4GcmlSl2hT2y9DLzz3Mo",
  authDomain: "vuexfirebase-f8707.firebaseapp.com",
  databaseURL: "https://vuexfirebase-f8707-default-rtdb.firebaseio.com",
  projectId: "vuexfirebase-f8707",
  storageBucket: "vuexfirebase-f8707.appspot.com",
  messagingSenderId: "83342442865",
  appId: "1:83342442865:web:38126ec11d50ea4b0c76d0",
  measurementId: "G-R2ZPBT75S6",
};

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

Vue.component("base-button", BaseButton);
Vue.component("base-loading", BaseLoading);
Vue.component("jw-pagination", JwPagination);
Vue.component("base-dialog", BaseDialog);

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
