import axios from 'axios';

export async function swrFetch<T>(url: string, params?: IApiParams): Promise<IApiRes<T>> {
  const res = await axios({ url, method: 'GET', baseURL: '/api', params });

  return res;
}

// export const swrFetch = async (url: string, params: IApiParams): Promise<IApiRes<T>> => {
//   const res = await axios({ url, method: 'GET', baseURL: '/api', params });

//   return res;
// };
