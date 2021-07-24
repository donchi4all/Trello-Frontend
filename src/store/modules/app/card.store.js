import { card as Card } from "./../../../service";

const initState = {
  status: {
    loading: false,
    success: null,
    failed: null,
    errors: null,
  },

  card: null,
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
    STORE_CARD: (state, card = null) => {
      state.card = card ? card.data || null : null;
    },
  },

  actions: {
    async createCard(context, { boardId , listId , params} ) {
      try {
        context.commit("LOADING");
        const { data } = await Card.createCard(boardId , listId , params);
        context.commit("SUCCESS");
        context.commit("STORE_CARD", data);
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },

    async updateCard(context, { boardId , listId, cardId , params}) {
      try {
        context.commit("LOADING");
        const { data } = await Card.updateCard(boardId, listId, cardId, params);
        context.dispatch("getCards");
        context.commit("SUCCESS", data);
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },
    async getCards(context, $boardId) {
      try {
        context.commit("LOADING");
        const { data } = await Card.allCard($boardId);
        context.commit("SUCCESS", data);
        context.commit("STORE_CARD", data);
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
        const { data } = await Card.findCard(boardId);
        context.commit("STORE_CARD", data);
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
        const { data } = await Card.deleteCard(boardId);
        context.commit("SUCCESS", data);
        return Promise.resolve(data);
      } catch (error) {
        context.commit("FAILED", error.response);
        return Promise.reject(error.response.data);
      }
    },
  },

  getters: {
    getCards: (state) => state.card,
  },
};
