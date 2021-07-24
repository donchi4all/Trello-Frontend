const TRELLO_AUTH_TOKEN = "trello_auth_token";
const TRELLO_AUTH_TOKEN_EXP = "trello_auth_token_exp";
const TRELLO_USER_ID = "trello_user_id";
const TRELLO_USER_EMAIL = "trello_user_email";
const TRELLO_USER_NAME = "trello_user_name";
const TRELLO_REDIRECT = "trello_redirect";

export const getRedirect = () => {
  return window.localStorage.getItem(TRELLO_REDIRECT);
};
export const setRedirect = (currentPath) => {
  return window.localStorage.setItem(TRELLO_REDIRECT, currentPath);
};
export const deleteRedirect = () => {
  return window.localStorage.removeItem(TRELLO_REDIRECT);
};

export const getToken = () => {
  return window.localStorage.getItem(TRELLO_AUTH_TOKEN);
};

export const getExpiration = () => {
  return window.localStorage.getItem(TRELLO_AUTH_TOKEN_EXP);
};

export const saveToken = (token) => {
  window.localStorage.setItem(TRELLO_AUTH_TOKEN, token.access_token);
  window.localStorage.setItem(
    TRELLO_AUTH_TOKEN_EXP,
    token.expires_in + Date.now() * 2
  );
};

export const destroyToken = () => {
  window.localStorage.removeItem(TRELLO_AUTH_TOKEN);
  window.localStorage.removeItem(TRELLO_AUTH_TOKEN_EXP);
};

export const getUserID = () => {
  return window.localStorage.getItem(TRELLO_USER_ID);
};

export const getUserEmail = () => {
  return window.localStorage.getItem(TRELLO_USER_EMAIL);
};

export const getUserName = () => {
  return window.localStorage.getItem(TRELLO_USER_NAME);
};

export const destroyUser = () => {
  window.localStorage.removeItem(TRELLO_USER_ID);
  window.localStorage.removeItem(TRELLO_USER_EMAIL);
  window.localStorage.removeItem(TRELLO_USER_NAME);
};

export const setUser = (user) => {
  window.localStorage.setItem(TRELLO_USER_ID, user.id);
  window.localStorage.setItem(TRELLO_USER_EMAIL, user.email);
  window.localStorage.setItem(TRELLO_USER_NAME, user.name);
};

export const setItem = (key, val) => {
  localStorage.setItem(key, val);
};

export const getItem = (item) => {
  return window.localStorage.getItem(item);
};

export const removeItems = (...items) => {
  items.map((item) => localStorage.removeItem(item));
};

export const clearStorage = () => localStorage.clear();

export default {
  getToken,
  getExpiration,
  saveToken,
  destroyToken,
  setUser,
  destroyUser,
  getUserID,
  getUserEmail,
  setItem,
  getItem,
  removeItems,
  clearStorage,
  getRedirect,
  setRedirect,
  deleteRedirect,
};
