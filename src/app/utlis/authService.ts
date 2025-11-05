import axios from "axios";

const BASEURL = process.env.REACT_APP_API_URL

const customAxios = (contentType:any, dispatch?:any,language?: string) => {
  const lang = language || navigator.language || 'en';
  const axiosInstance = axios.create({
    baseURL: BASEURL,
    headers: { "Content-Type": contentType, 'Accept-Language': lang },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const { config, response: { status } } = error;
      const originalRequest = config;

      if (status && ((status === 401))) {
        localStorage.clear();
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export { customAxios };
