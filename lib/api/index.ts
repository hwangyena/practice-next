import axios, { AxiosResponse } from 'axios';

// export const getFetch = <UserType>(url: string): Promise<UserType> => {
// export const getFetch: Fetcher<UserType[]> = (url: string) => {
export const getFetch = (url: string) => {
  console.log('fetch', url);

  return axios
    .get(`https://gorest.co.in/public${url}`)
    .then((res) => res.data)
    .catch(() => {
      return alert('error');
    });
  // return axios
  //   .get(`https://gorest.co.in/public${url}`)
  //   .then((res: AxiosResponse<UserType[] | undefined>)=>res.data)
  //   .catch(() => {
  //     return alert('error');
  //   });
};
