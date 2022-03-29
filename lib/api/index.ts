import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Fetcher } from 'swr';

/** 사용자 데이터 연동 with SWR */
export const getUsers: Fetcher<UserType[]> = async (url: string) => {
  const res = await axios({ url, method: 'get', baseURL: '/api' });
  return res.data;
};

export enum METHOD {
  GET = 'get',
  POST = 'post',
}

/** axios 데이터 연동(GET, POST) */
export const fetchAxios = async (path: string, method?: METHOD): Promise<AxiosResponse<UserType[]>> => {
  const axiosConfig: AxiosRequestConfig = {
    method,
    url: path,
  };

  try {
    const res = await axios(axiosConfig);

    return res.data;
    // return {
    //   ok: res.data.code === '200',
    //   status: res.status,
    //   statusText: res.statusText,
    //   code: res.data.code,
    //   message: res.data.message,
    //   result: res.data.result,
    //   headers: res.headers
    // }
  } catch (err) {
    const axiosError = err as AxiosError;
    const res = axiosError.response;

    return res?.data;
    // return {
    //   ok: false,
    //   status: res?.status,
    //   statusText: res?.statusText,
    //   code: res?.data.code,
    //   message: res?.data.message,
    //   result: res?.data.result,
    //   headers: res?.headers
    // }
  }
};
