import axios from 'axios';

export async function swrFetch<T>(url: string, params?: IApiParams): Promise<IApiRes<T>> {
  const res = await axios({ url, method: 'GET', baseURL: '/api', params });

  if (res.status !== 200) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }

  return res;
}

// export const swrFetch = async (url: string, params: IApiParams): Promise<IApiRes<T>> => {
//   const res = await axios({ url, method: 'GET', baseURL: '/api', params });

//   return res;
// };
