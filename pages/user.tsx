import { useEffect, useState } from 'react';
import { UserTable } from '../components/user';
import { getUsers } from '../lib/api';
import { useUser } from '../lib/api/user';
import { UserStore } from '../store';

export default function UserPage() {
  const [num, setNum] = useState('');
  const [users, setUsers] = useState<UserType[]>([]);

  const { data } = useUser();

  useEffect(() => {
    data && setUsers(data);
  }, [data]);

  const handleUser = async () => {
    const newUser = await getUsers(`/v2/users?id=${num}`);
    setUsers(newUser);
  };

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
        <UserStore.Provider>
          <UserTable {...{ users }} />
        </UserStore.Provider>
      </main>
    </>
  );
}
