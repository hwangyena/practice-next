import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { EMAIL_REX } from 'src/lib/regex';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState<{ message: string; error: boolean }>({ message: '', error: false });

  const router = useRouter();
  const validLogin = email && pwd;

  const onLogin = () => {
    if (!email && !pwd) {
      return;
    }
    if (!EMAIL_REX.test(email)) {
      setError({ message: '이메일 형식이 맞지않습니다.', error: true });
      return;
    }

    setError((p) => ({ ...p, error: false }));
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-2 w-full border-0  focus:outline-0"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              autoComplete="off"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
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
