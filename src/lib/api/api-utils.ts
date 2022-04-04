import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export enum METHOD {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
}
/** axios 데이터 연동(GET, POST) */
export const fetch = async <T>(
  path: string,
  method?: METHOD,
  params?: Record<string, unknown> | FormData
): Promise<IApiRes<T>> => {
  const axiosConfig: AxiosRequestConfig = {
    method,
    url: path,
    baseURL: '/api',
  };

  if (method !== METHOD.GET && params) {
    axiosConfig.data = params;
  }

  if (method === METHOD.GET && params) {
    axiosConfig.params = params;
    // axiosConfig.paramsSerializer = (params: Record<string, string | number | boolean | queryString)
  }

  try {
    console.log('axiosConfig', axiosConfig.data);
    const res = await axios(axiosConfig);

    return {
      data: res.data,
      status: res.status,
      statusText: res.statusText,
      // isValidating: res.isValidating,
    };
  } catch (err) {
    const axiosError = err as AxiosError;
    const res = axiosError.response;

    return res?.data;
  }
};
