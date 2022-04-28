import useSWR from 'swr';

type GlobalType = {
  name: string;
  count: number;
};

export const useGlobal = () => {
  const { data, mutate } = useSWR<GlobalType>('/local/global', () => ({ name: 'undefined', count: 0 }));

  const setName = (value: string) => {
    if (data) {
      mutate({ ...data, name: value }, false);
    }
  };

  const setCount = (type: 'increase' | 'decrease') => {
    if (data) {
      mutate({ ...data, count: type === 'increase' ? data.count + 1 : data.count - 1 }, false);
    }
  };

  return { data, setName, setCount };
};

export default useGlobal;
