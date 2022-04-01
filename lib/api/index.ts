import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export enum METHOD {
  GET = 'get',
  POST = 'post',
}

/** passenger 데이터 연동 */
export const getPassenger = async (url: string, params: IApiParams): Promise<IApiRes> => {
  const res = await axios({ url, method: 'GET', baseURL: '/api', params });

  return res;
};

/** axios 데이터 연동(GET, POST) */
export const fetchAxios = async (path: string, method?: METHOD): Promise<AxiosResponse<IApiRes[]>> => {
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
