import { useEffect, useRef, useState } from 'react';
import Pagination, { PAGE_LIST_PER_ONCE } from 'src/components/custom/pagination';
import { PassengerAddButton, PassengerTable } from 'src/components/passenger';
import PassengerApiList from 'src/lib/api/passenger';
import { UserStore } from 'src/store';

export default function UserPage() {
  const [passengers, setPassengers] = useState<PassengerType[]>([]);
  const [current, setCurrent] = useState(1);

  const total = useRef(0);

  const res = PassengerApiList.usePassenger({ current: current - 1, size: PAGE_LIST_PER_ONCE });

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
      <main className="grid place-items-center mt-3 p-2">
        <h3>사용자 목록</h3>
        <section className="w-[50%] flex justify-end">
          <PassengerAddButton />
        </section>
        <UserStore.Provider>
          <PassengerTable {...{ passengers }} />
        </UserStore.Provider>
        <Pagination currentPage={current} total={total.current} onPageChange={onPageChange} />
      </main>
    </>
  );
}
