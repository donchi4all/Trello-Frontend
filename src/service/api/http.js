import axios from "axios";
import router from "./../../router";
import { getToken } from "../../utils/jwt";

const axiosConfig = {
  baseURL: `${process.env.VUE_APP_API_BASE_URL}/api/v1`,
  //TODO: Yet to confirm if there is any need to add a timeout on API calls on frontend
  // timeout: 10000,
  "Content-Type": "application/json",
};

const authInterceptor = (config) => {
  if (getToken()) config.headers["Authorization"] = "Bearer " + getToken();
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
};

const responseInterceptor = [
  (response) => response,
  (error) => {
    // check if it's a server error
    if (!error.response) {
      error.response = {
        data: { message: "Please check your internet connection." },
      };
      if (process.env.NODE_ENV !== "production") console.warn(error);
      return Promise.reject(error);
    }

    // all the other error responses
    switch (error.response.status) {
      case 400:
        if (process.env.NODE_ENV !== "production")
          console.error(error.response.status, error.message);
        break;

      // authentication error, logout the user
      case 401:
        if (
          router &&
          router.history &&
          router.history.current &&
          router.history.current.path !== "/login"
        )
          router.push("/logout");

        break;

      //
      case 403:
        alert(
          "Unauthorized Access",
          error.response.data.message || error.message,
          "error"
        );
        break;

      default:
        if (process.env.NODE_ENV !== "production")
          console.error(error.response.status, error.message);
    }
    return Promise.reject(error);
  },
];

const HTTP = axios.create(axiosConfig);
HTTP.interceptors.request.use(authInterceptor);
HTTP.interceptors.response.use(...responseInterceptor);

export default HTTP;
export const AXIOS = axios.create();
