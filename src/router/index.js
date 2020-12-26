import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/game",
    name: "Game",

    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Game.vue")
  },
  {
    path: "/loginWithEmail",
    name: "LoginWithEmail",

    component: () =>
      import(/* webpackChunkName: "home" */ "../views/LoginWithEmail.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;