import Vue from "vue";
import VueRouter from "vue-router";
import Employees from "../components/Employees.vue";
import UserDetail from "../views/UserDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Employees",
    component: Employees,
    redirect: "/employees",
  },

  {
    path: "/employees",
    name: "Employee",
    component: Employees,
  },
  {
    path: "/employee/detail/:id",
    name: "Detail",
    props: true,
    component: UserDetail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
