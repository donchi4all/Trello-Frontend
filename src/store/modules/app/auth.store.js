import { auth as AUTH } from "./../../../service";
import jwt from "../../../utils/jwt";

const initState = {
  status: {
    loading: false,
    success: null,
    failed: null,
    errors: null,
  },

  isAuthenticated: !!jwt.getToken(),
  user: {},
};

export default {
  namespaced: true,
  state: Object.assign({}, initState),

  // TODO: Move all Status related mutations to root state so its not duplicated
  mutations: {
    SET_AUTH: (state, oauth) => {
      const { data } = oauth;
      state.isAuthenticated = true;
      jwt.saveToken(data);
    },

    // TODO: also remove persisted permissions
    UNSET_AUTH: (state) => {
      state.isAuthenticated = false;
      state = { ...initState };
      state.user = { ...initState.user };
      jwt.destroyToken();
    },

    SET_USER: (state, data) => {
      state.user = data.data;
      jwt.setUser(data.data);
    },

    UNSET_USER: (state) => {
      state.user = { ...initState.user };
      jwt.destroyUser();
    },

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
      state.status.errors = errors.data.message ?? null;
    },
  },

  actions: {
    async register(context, params) {
      try {
        context.commit("LOADING");
        const { data } = await AUTH.register(params);
        context.commit("SUCCESS");
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response);
      }
    },
    async login(context, params) {
      try {
        context.commit("LOADING");
        const { data } = await AUTH.login(params);
        context.commit("SET_AUTH", data);
        context.dispatch('me');
        context.commit("SUCCESS");
        return Promise.resolve(data);
      } catch (error) {
        context.commit("UNSET_AUTH", error);
        context.commit("FAILED", error.response);
        return Promise.reject(error.response);
      }
    },

    async me(context) {
      try {
        context.commit("LOADING");
        const { data } = await AUTH.me();
        context.commit("SET_USER", data);
        context.commit("SUCCESS");
        return Promise.resolve(data);
      } catch (error) {
        context.commit("UNSET_USER", error);
        context.commit("FAILED", error.response);
        return Promise.reject(error.response);
      }
    },
    async logout(context) {
      try {
        context.commit("LOADING");

        AUTH.logout(jwt.getToken() || null);
        // const { data } = await AUTH.logout();
        context.commit("UNSET_AUTH");
        return Promise.resolve({ message: "Logout successful" });
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response);
      }
    },

  },

  getters: {
    getUser: (state) => state.user,
  },
};
