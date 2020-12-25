import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";

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
      import(/* webpackChunkName: "home" */ "../components/Game.vue")
  },
  {
    path: "/loginWithEmail",
    name: "LoginWithEmail",

    component: () =>
      import(/* webpackChunkName: "home" */ "../components/LoginWithEmail.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;