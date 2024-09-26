/* eslint-disable max-len */
import { ContentTypeEnum, RequestEnum } from '@/enum/http-enum';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import ApiResponseData from './type';
import { notification } from 'antd';

export interface RequestConfigExtra {
  token?: boolean;
  customDev?: boolean;
  loading?: boolean;
}

interface AxiosOptions<T> {
  url: string;
  params?: T;
  data?: T;
}

const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 100000,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
});
const requestHandler = async (config: InternalAxiosRequestConfig & RequestConfigExtra): Promise<InternalAxiosRequestConfig> => {
  // 处理请求前的url
  //  替换url的请求前缀baseUrl
  // config.baseURL = import.meta.env.VITE_APP_BASE_API_DEV;

  const token = window.localStorage.getItem('token');
  if (token && config.url !== 'user/session') config.headers.set('Authorization', token);

  //
  // console.log(config);
  //   if (token && config.url !== '/auth/user/login') config.headers.set('Authorization', token);

  // // 增加多语言的配置
  // const { locale } = useI18nLocale()
  // config.headers.set('Accept-Language', locale.value ?? 'zh-CN')
  // if (config.loading)
  //   axiosLoading.addLoading()
  return config;
};

const responseHandler = (response: any): ApiResponseData<any> | AxiosResponse<any> | Promise<any> | any => {
  const { data } = response;
  if (data.status !== '00000') {
    // Toast.error(data.message);
  }
  return data;
};
//
const errorHandler = (error: AxiosError): Promise<any> => {
  if (error.response) {
    const { statusText } = error.response as AxiosResponse<ApiResponseData<any>>;
    notification.error({ message: '请求失败', description: statusText, duration: null });
    // Toast.error(statusText)
  }
  return Promise.reject(error);
};
instance.interceptors.request.use(requestHandler);
instance.interceptors.response.use(responseHandler, errorHandler);
export default instance;

const instancePromise = async <R = any, T = any>(options: AxiosOptions<T> & RequestConfigExtra): Promise<ApiResponseData<R>> => {
  const { loading } = options;
  // instance.request<ApiResponseData<R>>(options)
  return new Promise((resolve, reject) => {
    instance.request<ApiResponseData<R>>(options).then((res) => {
      resolve(res as any);
    }).catch((e: Error | AxiosError) => {
      reject(e);
    })
      .finally(() => {
        if (loading) { /* empty */ }
        // axiosLoading.closeLoading()
      });
  });
};

export const getApi = < R=any, T = any> (url: string, params?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ApiResponseData<R>> => {
  const options = {
    url,
    params,
    method: RequestEnum.GET,
    ...config,
  };
  return instancePromise< R, T >(options);
};

export const postApi = < R=any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ApiResponseData<R>> => {
  const options = {
    url,
    data,
    method: RequestEnum.POST,
    ...config,
  };
  return instancePromise< R, T >(options);
};

export const putApi = < R=any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ApiResponseData<R>> => {
  const options = {
    url,
    data,
    method: RequestEnum.PUT,
    ...config,
  };
  return instancePromise<R, T>(options);
};

export const deleteApi = < R=any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ApiResponseData<R>> => {
  const options = {
    url,
    data,
    method: RequestEnum.DELETE,
    ...config,
  };
  return instancePromise<R, T>(options);
};
