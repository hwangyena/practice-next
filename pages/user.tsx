import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { fetchAxios, getUsers } from '../lib/api';
import { useUser } from '../lib/api/user';
import { transGender } from '../lib/function/tranform';

export default function UserPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [num, setNum] = useState('');

  const { data } = useUser();

  const handleUser = async () => {
    const newUser = await getUsers(`/v2/users?id=${num}`);
    setUsers(newUser);
  };

  useEffect(() => {
    data && setUsers(data);
  }, [data]);

  return (
    <>
      <header>
        <h2>Page /user</h2>
      </header>
      <main
        style={{
          padding: '20px',
        }}
      >
        어떤 사용자를 조회할까요?
        <br />
        <input
          value={num}
          onChange={(e) => setNum(e.target.value.replace(/[^0-9]/, ''))}
          required
          placeholder="아이디"
          onKeyDown={(e) => e.key === 'Enter' && handleUser()}
        />
        <button onClick={handleUser}>조회하기</button>
        <br />
        <h3>사용자 목록</h3>
        <table>
          <thead>
            <tr>
              <th>아이디</th>
              <th>이름</th>
              <th>성별</th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.name}</td>
                  <td>{transGender(v.gender)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>사용자가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </>
  );
}
