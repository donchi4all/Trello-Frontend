import { board as Board } from "./../../../service";

const initState = {
  status: {
    loading: false,
    success: null,
    failed: null,
    errors: null,
  },

  board: null,
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
    STORE_BOARD: (state, board = null) => {
      state.board = board ? board.data || null : null;
    },
  },

  actions: {
    async createBoard(context, params) {
      try {
        context.commit("LOADING");
        const { data } = await Board.createBoard(params);
        context.commit("SUCCESS");
        context.commit("STORE_BOARD", data);
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },

    async updateBoard(context, params) {
      try {
        context.commit("LOADING");
        const { data } = await Board.updateBoard(...params);
        context.dispatch("getBoards");
        context.commit("SUCCESS", data);
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },
    async getBoards(context) {
      try {
        context.commit("LOADING");
        const { data } = await Board.allBoard();
        context.commit("SUCCESS", data);
        context.commit("STORE_BOARD", data);
        return Promise.resolve(data);
      } catch (error) {
        console.log(error.response);
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },

    async findBoard(context, boardId) {
      try {
        context.commit("LOADING");
        const { data } = await Board.findBoard(boardId);
        context.commit("STORE_PAYMENT", data);
        context.commit("SUCCESS", data);
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },

    async deleteBoard(context, boardId) {
      try {
        context.commit("LOADING");
        const { data } = await Board.deleteBoard(boardId);
        context.commit("SUCCESS", data);
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },
  },

  getters: {
    getBoards: (state) => state.board,
  },
};
