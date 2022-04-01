import { useEffect, useRef, useState } from 'react';
import Pagination, { PAGE_LIST_PER_ONCE } from 'src/components/custom/pagination';
import { PassengerTable } from 'src/components/passenger';
import { UserStore } from 'src/store';
import useSWR from 'swr';
import { getPassenger } from '../lib/api';

export default function UserPage() {
  const [passengers, setPassengers] = useState<PassengerType[]>([]);
  const [current, setCurrent] = useState(1);

  const total = useRef(0);

  const params = { page: current - 1, size: PAGE_LIST_PER_ONCE };
  const res = useSWR<IApiRes | undefined>(['/v1/passenger', params], (url: string) => getPassenger(url, params));

  useEffect(() => {
    if (res.data) {
      setPassengers(res.data.data.data);
      total.current = res.data.data.totalPages;
    }
  }, [res]);

  const onPageChange = (page: number) => {
    setCurrent(page);
  };

  return (
    <>
      <header className="grid place-items-center mt-5">
        <h2>✈️ Page /passenger ✈</h2>
      </header>
      <main
        style={{
          padding: '20px',
        }}
        className="grid place-items-center mt-10"
      >
        <h3>사용자 목록</h3>
        <UserStore.Provider>
          <PassengerTable {...{ passengers }} />
        </UserStore.Provider>
        <Pagination currentPage={current} total={total.current} onPageChange={onPageChange} />
      </main>
    </>
  );
}
