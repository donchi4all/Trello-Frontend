import HTTP from "./../http";

export default {
  // Register
  register: (params) => HTTP.post("/register", params),

  me: () => HTTP.get("/me"),
  // Login
  login: (params) =>
    HTTP.post(`/login`, {
      ...params,
      client_secret: process.env.VUE_APP_OAUTH_CLIENT_SECRET,
      client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
      grant_type: process.env.VUE_APP_OAUTH_GRANT_TYPE,
    }),

  // Logout
  logout: (token = null) =>
    HTTP.post(
      "/logout",
      null,
      !token || { headers: { Authorization: `Bearer ${token}` } }
    ),
};
