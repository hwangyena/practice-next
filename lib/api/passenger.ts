import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
import { fetchAxios, getPassenger, METHOD } from '.';

export const usePassenger = ({ current = 0, size = 5 }: { current: number; size: number }) => {
  // const res = useSWR<{id: string; pw: string}>(userId ? `/v2/users/${userId}` : null , getFetch)
  const params = {
    page: current,
    size: size,
  };
  const res = useSWR<IApiRes | undefined>(['/v1/passenger', params], (url: string) => getPassenger(url, params));

  return res;
};

export const useLogin = () => {
  return useSWRConfig();
};
