import { useEffect, useState } from 'react';
import { Pagination } from '../components/custom';
import { PassengerTable } from '../components/passenger';
import { usePassenger } from '../lib/api/passenger';
import { UserStore } from '../store';

export default function UserPage() {
  const [num, setNum] = useState('');
  const [passengers, setPassengers] = useState<PassengerType[]>([]);
  const [current, setCurrent] = useState(1);

  const { data } = usePassenger({ current: 1, size: 10 });

  useEffect(() => {
    if (data) {
      setPassengers(data.data.data);
    }
  }, [data]);

  // const handleUser = async () => {
  //   // const newUser = await getUsers(`/v2/users?id=${num}`);
  //   const newUser = await getUsers(`/v1/passenger?id=${num}`);
  //   setUsers(newUser);
  // };

  return (
    <>
      <header>
        <h2>Page /passenger</h2>
      </header>
      <main
        style={{
          padding: '20px',
        }}
      >
        <h3>사용자 목록</h3>
        <UserStore.Provider>
          <PassengerTable {...{ passengers }} />
        </UserStore.Provider>
        <Pagination currentPage={current} total={data?.data.totalPages || 0} />
      </main>
    </>
  );
}
