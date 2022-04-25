import useSWR from 'swr';
import { sendRequest, SWR_KEY } from '.';

export const useUser = () => {
  const { data: userInfo, mutate, error: userError } = useSWR(SWR_KEY.userInfo);

  const login = async (loginId: string, password: string, force = false) => {
    const res = await sendRequest<UserInfo>({
      method: 'POST',
      path: '/employees/sign-in',
      params: { loginId, password, force },
    });

    if (res.data) {
      mutate(); // 데이터 갱신
      window.sessionStorage.setItem('accessToken', res.data.accessToken);
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
