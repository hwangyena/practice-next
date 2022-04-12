import { MouseEvent } from 'react';
import dynamic from 'next/dynamic';
import { PassengerStore } from '../../store';
import Trash from 'public/images/trash.svg';
import PassengerApiList from 'src/lib/api/passenger';

const PassengerDetailPopup = dynamic(() => import('./detail-popup'));

type Props = {
  passengers: PassengerType[];
};

/** 승객 정보 테이블 */
const PassengerTable = ({ passengers }: Props) => {
  const { selectPassenger, setSelectPassenger } = PassengerStore.useContainer();

  const handleClick = (e: MouseEvent<Element>, index: number) => {
    e.stopPropagation();
    setSelectPassenger(index);
  };

  const onDelete = async (e: MouseEvent<HTMLTableDataCellElement>, id: string) => {
    e.stopPropagation();
    const res = await PassengerApiList.deletePassenger(id);
    alert(res.statusText);
  };

  return (
    <table style={{ borderSpacing: '0 15px', borderCollapse: 'separate' }} className="min-w-[400px]">
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
            <tr key={i} className="cursor-pointer bg-gray-200" onClick={(e) => handleClick(e, i)}>
              <td className="p-3">{v.name}</td>
              <td className="p-3">{v.airline[0].country}</td>
              <td className="p-3 mt-3">{v.airline[0].name}</td>
              <td className="p-3" onClick={(e) => onDelete(e, v._id)}>
                <Trash className="h-6 w-6 text-slate-400 hover:text-slate-700" />
              </td>
              <td className="absolute">
                {i === selectPassenger && <PassengerDetailPopup passenger={v} handleClick={handleClick} />}
              </td>
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

export default PassengerTable;
