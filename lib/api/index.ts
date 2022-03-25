import axios, { AxiosError, AxiosResponse } from 'axios';
import { Fetcher } from 'swr';

export const getUsers: Fetcher<UserType[]> = (url: string) => {
  return axios
    .get(`https://gorest.co.in/public${url}`)
    .then((res: AxiosResponse<UserType[]>) => res.data)
    .catch((e: AxiosError) => {
      alert(`error ${e}`);
      return [];
    });
};
