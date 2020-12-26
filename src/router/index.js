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
    path: "/loginWithEmail",
    name: "LoginWithEmail",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/LoginWithEmail.vue")
  },
  {
    path: "/game",
    name: "Game",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Game.vue")
  },
  {
    path: "/allPairs",
    name: "AllPairs",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/allPairs.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;