import React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { getFetch } from '.';

export const useUser = () => {
  // const res = useSWR<{id: string; pw: string}>(userId ? `/v2/users/${userId}` : null , getFetch)
  const res = useSWR('/v2/users', getFetch);

  return res;
};

export const useLogin = () => {
  return useSWRConfig();
};
