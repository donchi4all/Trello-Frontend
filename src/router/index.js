import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Index from "../views/index";
import Board from "../views/Board";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/logout",
    name: "logout",
    meta: { requireAuth: true },
    async beforeEnter(_, __, next) {
      await store.dispatch("auth/logout");
      next("/login");
    },
  },
  /*
|--------------------------------------------------------------------------
| AUTHENTICATION ROUTES
|--------------------------------------------------------------------------
*/
  {
    path: "/",
    component: () => import("../views/MainIndex"),
    meta: { requireAuth: true },
    children: [
      {
        path: "",
        meta: { requireAuth: true },
        name: "Board",
        component: Board,
      },
      {
        path: ":id",
        name: "SingleBoard",
        props: true,
        component: Index
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
