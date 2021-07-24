import HTTP from "./../http";

const RESOURCE = "card";
const SUB_PARENT = "list";
const PARENT = "/board";
export default {
  // Create board
  createCard: (boardId, listId, params) =>
    HTTP.post(
      `${PARENT}/${boardId}/${SUB_PARENT}/${listId}/${RESOURCE}`,
      params
    ),

  // All board
  allCard: (boardId, listId) =>
    HTTP.get(`${PARENT}/${boardId}${SUB_PARENT}/${listId}/${RESOURCE}`),

  // Find board
  findCard: (boardId, listId, cardId) =>
    HTTP.post(
      `${PARENT}/${boardId}/${SUB_PARENT}/${listId}/${RESOURCE}/${cardId}`
    ),

  // Update board
  updateCard: (boardId, listId, cardId, params) =>
    HTTP.put(
      `${PARENT}/${boardId}/${SUB_PARENT}/${listId}/${RESOURCE}/${cardId}`,
      params
    ),

  //
  deleteCard: (boardId, listId, cardId) =>
    HTTP.delete(
      `${PARENT}/${boardId}/${SUB_PARENT}/${listId}/${RESOURCE}/${cardId}`
    ),
};
