import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as apiFactory from "./service";
import { checkAuth } from "./utils/middlewares";
import mixins from "./utils/mixins";

//Make some function available globally
Vue.mixin(mixins);

// Make the entire api services globally accessible
Vue.prototype.$api = apiFactory;
// Ensure Auth Guard Check for auth routes
router.beforeEach(checkAuth);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
