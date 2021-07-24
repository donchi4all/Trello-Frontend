import HTTP from "./../http";

const RESOURCE = "/board";
export default {
  // Create board
  createBoard: (params) => HTTP.post(`${RESOURCE}`, params),

  // All board
  allBoard: () => HTTP.get(`${RESOURCE}`),

  // Find board
  findBoard: (boardId) => HTTP.post(`${RESOURCE}/${boardId}`),

  // Update board
  updateBoard: (boardId, params) => HTTP.put(`${RESOURCE}/${boardId}`, params),

  //
  deleteBoard: (boardId) => HTTP.delete(`${RESOURCE}/${boardId}`),
};
