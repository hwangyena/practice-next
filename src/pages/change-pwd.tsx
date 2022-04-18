import React, { useState } from 'react';

export default function ChangePwd() {
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [errorPwd, setErrorPwd] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState(false);

  const onCheckPwd = () => {
    if (!pwd) {
      setErrorPwd(false);
      return;
    }

    let combination = 0;
    if (pwd.search(/[a-z]/) !== -1) {
      combination += 1;
    }
    if (pwd.search(/[A-Z]/) !== -1) {
      combination += 1;
    }
    if (pwd.search(/\d/) !== -1) {
      combination += 1;
    }
    if (pwd.search(/[.?!@#$%^&*₩'"_-]/) !== -1) {
      combination += 1;
    }

    if (combination <= 2 || pwd.length < 8) {
      setErrorPwd(true);
      return;
    }

    setErrorPwd(false);
  };

  const onCheckConfirmPwd = () => {
    if (!confirmPwd) {
      setErrorConfirm(false);
      return;
    }
    if (confirmPwd !== pwd) {
      setErrorConfirm(true);
      return;
    }
    setErrorConfirm(false);
  };

  return (
    <main className="grid place-items-center h-screen">
      <div>
        <section className="text-center">
          <h2>비밀번호 재설정</h2>
          <h3 className="mb-10">새로운 비밀번호를 설정해주세요.</h3>
        </section>
        <section className="">
          <h3>비밀번호</h3>
          <p className="text-slate-400">
            영문 대/소문자, 숫자, 특수문자 중 3가지를 조합하여 최소 8자리 이상으로 입력해주세요.
          </p>
          <input
            placeholder="비밀번호를 입력해주세요."
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className={`p-2 w-full focus:outline-0 ${errorPwd && 'border-red-400'}`}
            onBlur={onCheckPwd}
          />
          <p className={`${errorPwd ? 'text-red-400' : 'opacity-0'}`}>비밀번호를 확인해주세요.</p>
        </section>
        <section className="mt-5">
          <h3>비밀번호 확인</h3>
          <input
            placeholder="비밀번호를 다시 입력해주세요."
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            className={`p-2 w-full focus:outline-0 ${errorConfirm && 'border-red-400'}`}
            onBlur={onCheckConfirmPwd}
          />
          <p className={`${errorConfirm ? 'text-red-400' : 'opacity-0'}`}>비밀번호가 일치하지 않습니다.</p>
        </section>
        <button className="w-full p-3 bg-slate-400 mt-10 text-white">확인</button>
      </div>
    </main>
  );
}
