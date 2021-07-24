import { dump as Dump } from "./../../../service";

const initState = {
  status: {
    loading: false,
    success: null,
    failed: null,
    errors: null,
  },
};

export default {
  namespaced: true,
  state: { ...initState },

  mutations: {
    LOADING: (state) => {
      state.status = { ...initState.status };
      state.status.loading = true;
    },

    SUCCESS: (state) => {
      state.status = { ...initState.status };
      state.status.success = true;
    },

    FAILED: (state, errors = null) => {
      state.status = { ...initState.status };
      state.status.failed = true;
      state.status.errors = errors.message ?? null;
    },
  },

  actions: {
    async dumpDB(context) {
      try {
        context.commit("LOADING");
        const { data } = await Dump.dupmpDB();
        context.commit("SUCCESS");
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },
  },

  getters: {},
};
