import React, { useEffect, useMemo, useState } from 'react';
import Add from 'public/images/add.svg';
import dynamic from 'next/dynamic';
import { Loading } from '../custom';
import PassengerApiList from 'src/lib/api/passenger';

const PopUp = dynamic(() => import('../custom/pop-up'));

/** 승객 추가 버튼 및 모달 */
const PassengerAddButton = () => {
  const [visible, setVisible] = useState(false);

  const [name, setName] = useState('');
  const [trips, setTrips] = useState('');
  const [airline, setAirline] = useState('');

  const { data, error } = PassengerApiList.useAirline();

  const airlines = useMemo(() => data?.data.slice(0, 10), [data]);
  // const airlines = res.data?.data;

  const onCancel = () => {
    setVisible(false);
  };

  const onSubmit = async () => {
    if (!name) {
      alert('Please Insert name value.');
      return;
    }
    if (!trips) {
      alert('Please Insert trips value.');
      return;
    }
    if (!airline) {
      alert('Please select the airline.');
      return;
    }

    const res = await PassengerApiList.createPassenger(name, Number(trips), Number(airline));

    onCancel();
    if (res.status === 200) {
      alert(`새로운 승객을 등록했습니다.`);
    } else {
      alert(`[Error] ${res.statusText}`);
    }
  };

  useEffect(() => {
    if (!visible) {
      setName('');
      setTrips('');
      setAirline('');
    }
  }, [visible]);

  return (
    <>
      <div className="cursor-pointer mt-3" onClick={() => setVisible(true)}>
        <Add className="h-7 w-7 text-slate-300 hover:text-slate-500" alt="user-add" />
      </div>
      <PopUp title="승객 추가" {...{ visible, onCancel }}>
        <main className="flex gap-3 flex-col">
          <label>
            name:
            <input className="ml-3" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            travel:
            <input
              className="ml-3"
              value={trips}
              onChange={(e) => setTrips(e.target.value.replace(/[^0-9]/, ''))}
              placeholder="only numbers"
            />
          </label>
          {error ? (
            <>Error!</>
          ) : data === undefined ? (
            <Loading />
          ) : (
            <div className="">
              <table>
                <thead>
                  <tr>
                    <th>선택</th>
                    <th>비행기명</th>
                    <th>도착지</th>
                    <th>웹사이트</th>
                    <th>슬로건</th>
                  </tr>
                </thead>
                <tbody>
                  {airlines &&
                    airlines.map((v) => (
                      <tr key={v.id}>
                        <td>
                          <input
                            type="radio"
                            name="airline"
                            value={v.id}
                            checked={airline === String(v.id)}
                            onChange={(e) => setAirline(e.target.value)}
                          />
                        </td>
                        <td>{v.name}</td>
                        <td>{v.country}</td>
                        <td>{v.website}</td>
                        <td>{v.slogan}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
        <footer className="flex justify-center pt-5 gap-3">
          <button onClick={onCancel} className="bg-red-200 text-red-500 font-bold rounded-md">
            취소
          </button>
          <button onClick={onSubmit} className="bg-green-200 text-green-700 font-bold rounded-md">
            추가
          </button>
        </footer>
      </PopUp>
    </>
  );
};

export default PassengerAddButton;
