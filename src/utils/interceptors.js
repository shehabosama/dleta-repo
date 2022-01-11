import axios from "axios";

export const requestConfig = currentUser => {
  axios.interceptors.request.use(
    async config => {
      const { Authorization } = config.headers;
      const authorization = currentUser
        ? {
            Authorization: `QU!Ux8h${currentUser.accessToken}`
          }
        : Authorization
        ? { Authorization }
        : Authorization;

      return {
        ...config,
        headers: {
          "Accept-Language": { lang: "ar", rtl: true },
          ...config.headers,
          ...authorization,
          "content-Type": "application/json"
        }
      };
    },
    error => {
      Promise.reject(error);
    }
  );
};
