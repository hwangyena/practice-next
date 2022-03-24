import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { getFetch } from '../lib/api';
import { useUser } from '../lib/api/user';
import { transGender } from '../lib/function/tranform';

export default function UserPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [num, setNum] = useState('');

  const { data } = useUser();
  const { mutate } = useSWRConfig();

  const handleUser = () => {
    // const update = mutate(`/v2/users/${num}`, () => {
    //   getFetch(`/v2/users/${num}`).then((res) => {
    //     setUsers(res.data);
    //   });
    // });
    getFetch(`/v2/users/${num}`).then((res) => {
      console.log('res2', res);
      //res가 [] ? {} ?인지에 대한 확인이 필요

      setUsers([res]);
    });

    console.log();
  };

  useEffect(() => {
    data && setUsers(data);
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
    </div>
  );
}
