import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
import { getUsers } from '.';

export const useUser = () => {
  // const res = useSWR<{id: string; pw: string}>(userId ? `/v2/users/${userId}` : null , getFetch)
  const res = useSWR<UserType[] | undefined>('/v2/users', getUsers);

  return res;
};

export const useLogin = () => {
  return useSWRConfig();
};
