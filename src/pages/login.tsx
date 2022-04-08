import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from 'src/lib/endpoints/employees';
import { UseBeforeUnload } from 'src/lib/hooks';
import { EMAIL_REX } from 'src/lib/regex';

export default function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ message: string; error: boolean }>({ message: '', error: false });

  const router = useRouter();
  const validLogin = loginId && password;

  const { login } = useUser();
  UseBeforeUnload();

  /** login */
  const onLogin = async () => {
    if (!loginId && !password) {
      return;
    }
    if (!EMAIL_REX.test(loginId)) {
      setError({ message: '이메일 형식이 맞지않습니다.', error: true });
      return;
    }

    const res = await login(loginId, password);

    if (!res) {
      // 10회이상 잘못 입력했는지 확인 필요
      setError({ message: '아이디 또는 비밀번호를 잘못 입력하셨습니다.', error: true });
      return;
    }
    setError((p) => ({ ...p, error: false }));
  };

  /** USEEFFECT */
  // useEffect(() => {
  //   const handleUnload = (e: BeforeUnloadEvent) => {
  //     e.preventDefault();
  //     e.returnValue = ''; //이거하면 크롬창이 나오니?
  //     console.log('hh');
  //   };

  //   window.addEventListener('beforeunload', handleUnload);
  //   return () => window.removeEventListener('beforeunload', handleUnload);
  // }, []);

  return (
    <main className="grid place-items-center flex-col h-screen">
      <div>
        <h2 className="text-center">로그인</h2>
        <div className="flex flex-col mt-5">
          <div className={`w-full border ${error.error && 'border-red-500'}`}>
            <input
              className="p-2 w-full border-0 border-b border-slate-200 focus:outline-0"
              placeholder="이메일을 입력해주세요."
              autoComplete="off"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <input
              className="p-2 w-full border-0  focus:outline-0"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error.error && <span className="text-red-500">{error.message}</span>}
          <button onClick={() => router.push('find-pwd')} className="underline justify-end w-fit  self-end">
            비밀번호를 잊으셨나요?
          </button>
          <button
            className={`mt-5 rounded-md p-3 ${!validLogin ? 'bg-slate-100 cursor-auto' : 'bg-slate-400 text-white'}`}
            onClick={onLogin}
          >
            로그인
          </button>
        </div>
      </div>
    </main>
  );
}
