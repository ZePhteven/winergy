import { toast } from "react-toastify";

import axios, { InternalAxiosRequestConfig } from "axios";

import { ApiAuthService, API_TOKEN_URL } from "@app/services";
// import { AppUser } from "@app/models/app";

// import { i18n } from "./i18n";

const HTTP_CODE_UNAUTHORIZED = 401;

const ERR_CODE_CANCELLED = "ERR_CANCELED";

export const apiHttp = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

let initialized = false;

export const setUpAtlasInterceptor = (/*user: AppUser*/) => {
  if (/*!user || */ initialized) {
    return;
  }

  initialized = true;

  apiHttp.interceptors.request.use(
    async (request: InternalAxiosRequestConfig) => {
      // request.headers.set(RequestHeader.API_USER_ID, user.id);
      // request.headers.set(RequestHeader.API_USER_NAME, user.name);
      if (request.url === API_TOKEN_URL) {
        return request;
      }

      const token = await ApiAuthService.getToken();

      if (token) {
        request.headers.Authorization = `Bearer ${token.value}`;
      }

      return request;
    },
    async (error) => {
      if (error.response.data.statusCode === HTTP_CODE_UNAUTHORIZED) {
        await ApiAuthService.getToken();
      }

      return Promise.reject(error);
    }
  );

  apiHttp.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response?.data?.statusCode === HTTP_CODE_UNAUTHORIZED &&
        error.config.url !== API_TOKEN_URL
      ) {
        await ApiAuthService.getToken(true);
      }

      if (error.code !== ERR_CODE_CANCELLED) {
        toast.error(
          "BAD BAD BAD"
          // i18n.t<string>("text.error.api", {
          //   errorCode: error.response?.data?.statusCode,
          //   errorMessage: error.response?.data?.message ?? error.message,
          // })
        );
      }

      return Promise.reject(error);
    }
  );
};
