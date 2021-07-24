import { list as List } from "./../../../service";

const initState = {
  status: {
    loading: false,
    success: null,
    failed: null,
    errors: null,
  },

  list: null,
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
      state.status.errors = errors ? errors.message || null : null;
    },
    STORE_LIST: (state, list = null) => {
      state.list = list ? list.data || null : null;
    },
  },

  actions: {
    async createList(context, {boardId , params}) {
      try {
        context.commit("LOADING");
        const { data } = await List.createList( boardId, params );
        context.commit("SUCCESS");
        context.commit("STORE_LIST", data);
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },

    async updateList(context, params) {
      try {
        context.commit("LOADING");
        const { data } = await List.updateList(...params);
        context.dispatch("getLists");
        context.commit("SUCCESS", data);
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },
    async getLists(context, $boardId) {
      try {
        context.commit("LOADING");
        const { data } = await List.allList($boardId);
        context.commit("SUCCESS", data);
        context.commit("STORE_LIST", data);
        return Promise.resolve(data);
      } catch (error) {
        console.log(error.response);
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },

    async findList(context, boardId) {
      try {
        context.commit("LOADING");
        const { data } = await List.findList(boardId);
        context.commit("STORE_PAYMENT", data);
        context.commit("SUCCESS", data);
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },

    async deleteList(context, {boardId, listId}) {
      try {
        context.commit("LOADING");
        const { data } = await List.deleteList(boardId, listId);
        context.commit("SUCCESS", data);
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },
  },

  getters: {
    getLists: (state) => state.list,
  },
};
