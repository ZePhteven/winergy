import { useApiAuthStore } from "@app/store/auth";
import { apiHttp } from "@app/utils/api.http";

export const API_TOKEN_URL = "auth/login";

async function getToken(forceRefresh?: boolean) {
  let token = useApiAuthStore.getState().token;

  if (!!token && new Date(token.expiresOn!) > new Date() && !forceRefresh) {
    return token;
  }

  const request = {
    username: import.meta.env.VITE_API_CLIENT_ID,
    password: import.meta.env.VITE_API_CLIENT_SECRET,
  };
  const response = await apiHttp.post(API_TOKEN_URL, request);

  if (response) {
    token = {
      value: response.data.accessToken,
      expiresOn: new Date(response.data.expiresOn).getTime(),
    };
  }

  useApiAuthStore.setState({ token });

  return token;
}

export const ApiAuthService = {
  getToken,
};
