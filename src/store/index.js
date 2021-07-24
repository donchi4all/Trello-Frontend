import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);


const initState = {
  apiCallInfo: {
    payload: [],
    action: null,
    message: "",
  },
};

export default new Vuex.Store({
  modules: {
    ...modules,
  },

  state: { ...initState },

  mutations: {
    RECORD_API_CALL: (state, data) => {
      state.apiCallInfo = JSON.parse(JSON.stringify(initState.apiCallInfo));
      state.apiCallInfo.payload.push(...data.payload),
        (state.apiCallInfo.action = data.action || null),
        (state.apiCallInfo.message = data.message || "");
    },
  },

  getters: {
    getApiCallInfo(state) {
      return state.apiCallInfo;
    },
  },

});
