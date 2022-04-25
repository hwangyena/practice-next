import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from 'src/lib/endpoints/employees';

export default function Dashboard() {
  const { userInfo } = useUser();
  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    console.log('accessToken', accessToken);

    if (!accessToken) {
      router.replace('login');
    }
  });

  return <div>Dashboard</div>;
}
