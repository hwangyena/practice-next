import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import { mutate } from 'swr';

export const SWR_KEY = {
  // sample
  popup: '/local/popup',
  userInfo: '/local/userinfo',
};

axios.defaults.baseURL = '/rest-api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const handleError = (err: FetchError | AxiosError | unknown): FetchError => {
  let errRes: FetchError = {
    status: -1,
    statusText: 'Something went wrong!',
    code: 'Unknown',
    isFetchError: true,
  };

  if (axios.isAxiosError(err)) {
    const response = err.response;
    errRes.status = response?.status || -1;
    errRes.statusText = response?.statusText || 'No status text';
  } else if ((err as FetchError).isFetchError) {
    errRes = err as FetchError;
  } else {
    return errRes;
  }

  switch (errRes.code) {
    // sample
    case 'code for unauthorized':
      mutate(SWR_KEY.userInfo, null, false);
      break;
    default:
      alert(`status: ${errRes.status}\nstatusText: ${errRes.statusText}\ncode: ${errRes.code}`);
  }

  return errRes;
};

export const sendRequest = async <T>(request: RequestForm): Promise<{ data: T | null; error: FetchError | null }> => {
  const axiosConfig: AxiosRequestConfig = {
    method: request.method,
    url: request.path,
    ...request.config,
  };

  if (request.params) {
    if (request.method === 'GET') {
      axiosConfig.params = request.params;
      axiosConfig.paramsSerializer = (params: Record<string, unknown>) => {
        return queryString.stringify(params);
      };
      if (request.method !== 'GET') {
        axiosConfig.data = request.params;
      }
    }
  }
  try {
    const res = await axios(axiosConfig);

    // TODO: Success conditions for each project policy
    if (Math.floor(res.status / 100) === 2) {
      return { data: res.data.data, error: null };
    } else {
      throw {
        status: res.status,
        statusText: res.statusText,
        // TODO: code as each project's policy
        code: res.data.code,
        isFetchError: true,
      } as FetchError;
    }
  } catch (err) {
    // throw err;
    const errRes = handleError(err);
    return { data: null, error: errRes };
  }
};

// Only for GET request
export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const res = await axios.get(url);

    // TODO: Success conditions for each project policy
    if (Math.floor(res.status / 100) === 2) {
      return res.data;
    } else {
      throw {
        status: res.status,
        statusText: res.statusText,
        // TODO: code as each project's policy
        code: 'Unknown',
        isFetchError: true,
      } as FetchError;
    }
  } catch (err) {
    const errRes = handleError(err);
    throw errRes;
  }
};
