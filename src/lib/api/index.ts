import axios from 'axios';

export async function getFetch<T>(url: string, params?: IApiParams): Promise<IApiRes<T>> {
  const res = await axios({ url, method: 'GET', baseURL: '/api', params });

  if (res.status !== 200) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }

  return res;
}

export async function getFetchInQuery(url: string, params?: IApiParams) {
  const res = await axios.get(url, { baseURL: '/api', params });
  return res;
}
