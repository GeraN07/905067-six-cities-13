import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './services';
import { toast } from 'react-toastify';
import { AppRoute, GLOBAL_TOAST_ID, TOAST_POSITION } from '../const';
import browserHistory from './browser-history';

type DetailMessageType = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://14.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response?.status === StatusCodes.NOT_FOUND) {
        browserHistory.push(AppRoute.NotFound);
      }
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;

        toast.warn(detailMessage.message, {
          position: TOAST_POSITION,
          toastId: GLOBAL_TOAST_ID,
        });
      }

      throw error;
    }
  );

  return api;
};
