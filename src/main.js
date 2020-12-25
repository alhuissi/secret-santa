import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from "./router";
import store from "./store/store";
import VueMeta from "vue-meta";
import VueSweetalert2 from 'vue-sweetalert2';
import i18n from './i18n';
import { firebaseListener } from "./config/firebaseConfig";

Vue.config.productionTip = false;

//Style options for vue-sweetalert2
const options = {
  confirmButtonColor: 'green',
  cancelButtonColor: 'red',
};

Vue.use(VueMeta);
Vue.use(VueSweetalert2, options);

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

firebaseListener(authStatusChange);

function authStatusChange(user) {
	if (store) {
		store.commit("AUTH_STATUS_CHANGE");
		if (user) {
			store.commit("AUTH_INFO");
			}
	}
}
