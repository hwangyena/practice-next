import { MouseEvent } from 'react';
import dynamic from 'next/dynamic';
import { UserStore } from '../../store';

const PassengerDetailPopup = dynamic(() => import('./detail-popup'));

type Props = {
  passengers: PassengerType[];
};

/** 승객 정보 테이블 */
const PassengerTable = ({ passengers }: Props) => {
  const { selectUser, setSelectUser } = UserStore.useContainer();

  const handleClick = (e: MouseEvent<Element>, index: number) => {
    e.stopPropagation();
    setSelectUser(index);
  };

  return (
    <section className="grid place-items-center">
      <table style={{ borderSpacing: '0 15px', borderCollapse: 'separate' }}>
        {/* <table style={{ borderSpacing: '0 15px', borderCollapse: 'separate' }} className="grid place-items-center"> */}
        <thead>
          <tr>
            <th className="p-3">탑승자</th>
            <th className="p-3">도착지</th>
            <th className="p-3">비행기명</th>
          </tr>
        </thead>
        <tbody>
          {passengers ? (
            passengers.map((v, i) => (
              <tr key={v.id} className="cursor-pointer" onClick={(e) => handleClick(e, i)}>
                <td className="bg-gray-200 p-3">{v.name}</td>
                <td className="bg-gray-200 p-3">{v.airline[0].country}</td>
                <td className="bg-gray-200 p-3 mt-3">{v.airline[0].name}</td>
                {i === selectUser && <PassengerDetailPopup passenger={v} handleClick={handleClick} />}
              </tr>
            ))
          ) : (
            <tr>
              <td>사용자가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default PassengerTable;
