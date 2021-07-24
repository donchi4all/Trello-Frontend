// import { sample as SAMPLE } from "@/services";

const initState = {
  status: {
    loading: false,
    success: null,
    failed: null,
    errors: null
  },

  transactions: null,
  users: null
};

export default {
  namespaced: true,
  state: { ...initState },

  mutations: {
    LOADING: state => {
      state.status = { ...initState.status };
      state.status.loading = true;
    },

    SUCCESS: state => {
      state.status = { ...initState.status };
      state.status.success = true;
    },

    FAILED: (state, errors = null) => {
      state.status = { ...initState.status };
      state.status.failed = true;
      state.status.errors = errors.message ?? null;
    }
  },

  actions: {
    // eslint-disable-next-line no-unused-vars
    async sample(context, params) {
      try {
        context.commit("LOADING");
        // make sample api calls
        context.commit("SUCCESS");
        return Promise.resolve("success");
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error);
      }
    }
  },

  getters: {}
};
