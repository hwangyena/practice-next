import { MouseEvent } from 'react';
import { transGender, transUserLabelToKor } from '../../lib/function/tranform';
import { CustomCloseButton } from '../custom';

type Props = {
  user: UserType;
  handleClick: (e: MouseEvent<Element>, index: number) => void;
};

/** 유저 - 상세 정보 팝업 */
const UserDetailPopup = ({ user, handleClick }: Props) => {
  return (
    <aside className="border-gray-100 border-4 absolute ml-3 p-3 rounded-md cursor-default">
      <CustomCloseButton onClose={(e) => handleClick(e, -1)} />
      <ul>
        {Object.keys(user).map((v) => (
          <li key={v} className="flex">
            <span className="w-20 font-bold">{transUserLabelToKor(v)}</span>
            <span>
              {v === 'gender' ? transGender(user[v as keyof UserType] as GenderType) : user[v as keyof UserType]}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserDetailPopup;
