import { MouseEvent } from 'react';
import dynamic from 'next/dynamic';
import { transGender } from '../../lib/function/tranform';
import { UserStore } from '../../store';

const UserDetailPopup = dynamic(() => import('./detail-popup'));

type Props = {
  users: UserType[];
};

/** 사용자 정보 테이블 */
const UserTable = ({ users }: Props) => {
  const { selectUser, setSelectUser } = UserStore.useContainer();

  const handleClick = (e: MouseEvent<Element>, index: number) => {
    e.stopPropagation();
    setSelectUser(index);
  };

  return (
    <table style={{ borderSpacing: '0 15px', borderCollapse: 'separate' }}>
      <thead>
        <tr>
          <th>아이디</th>
          <th>이름</th>
          <th>성별</th>
        </tr>
      </thead>
      <tbody>
        {users ? (
          users.map((v, i) => (
            <tr key={v.id} className="cursor-pointer" onClick={(e) => handleClick(e, i)}>
              <td className="bg-gray-200 p-3 mt-3">{v.id}</td>
              <td className="bg-gray-200 p-3">{v.name}</td>
              <td className="bg-gray-200 p-3">{transGender(v.gender)}</td>
              {i === selectUser && <UserDetailPopup user={v} handleClick={handleClick} />}
            </tr>
          ))
        ) : (
          <tr>
            <td>사용자가 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
