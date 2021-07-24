import HTTP from "./../http";

const RESOURCE = "list";
const PARENT = "/board"
export default {
  // Create board
  createList: (boardId, params) => HTTP.post(`${PARENT}/${boardId}/${RESOURCE}`, params),

  // All board
  allList: (boardId) => HTTP.get(`${PARENT}/${boardId}/${RESOURCE}`),

  // Find board
  findList: (boardId, listId) => HTTP.post(`${PARENT}/${boardId}/${RESOURCE}/${listId}`),

  // Update board
  updateList: (listId, params) => HTTP.put(`${RESOURCE}/${listId}`, params),

  //
  deleteList: (boardId, listId) => HTTP.delete(`${PARENT}/${boardId}/${RESOURCE}/${listId}`),
};
