import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { useUser } from '../lib/api/user';
import { transGender } from '../lib/function/tranform';

export default function UserPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [num, setNum] = useState('');

  const { data } = useUser();
  const { mutate } = useSWRConfig();

  const handleUser = () => {
    if (!num) {
      alert('아이디를 입력해주세요.');
      return;
    }
    mutate(`/v2/users/${num}`);
  };

  useEffect(() => {
    setUsers(data);
  }, [data]);

  return (
    <div
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
        <th>아이디</th>
        <th>이름</th>
        <th>성별</th>
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
            <td>loading...</td>
          </tr>
        )}
      </table>
    </div>
  );
}
