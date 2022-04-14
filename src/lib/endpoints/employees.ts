import useSWR from 'swr';
import { sendRequest, SWR_KEY } from '.';

export const useUser = () => {
  const { data: userInfo, mutate } = useSWR(SWR_KEY.userInfo);

  const login = async (loginId: string, password: string, force = false) => {
    const res = await sendRequest<{
      id: number;
      loginId: string;
      name: string;
      phone: string;
      role: string;
      svcId: string;
      jobInfoIds: { domainNo: string; channelId: string; svcId: string }[];
    }>({
      method: 'POST',
      path: '/employees/sign-in',
      params: { loginId, password, force },
    });

    // await sendRequest({method: 'POST',path: '/employees/sign-in', params: {loginId, password, force}})

    if (res.data) {
      mutate(); // 데이터 갱신
    }

    return res;
  };

  // const logout = async () => {
  //   const { data } = await sendRequest<>({ method: 'POST', path: '/', params: {} });
  //   return data;
  // };

  // const findPwd = async (loginId: string) => {
  //   const { data } = await sendRequest<>({ method: 'POST', path: '/', params: {} });

  //   return data;
  // };

  return { userInfo, login };
};
