import useSWR from 'swr';
import { swrFetch } from '.';
import { fetch, METHOD } from './api-utils';

const PassengerApiList = {
  usePassenger: ({ current = 0, size = 5 }: { current: number; size: number }) => {
    const params = {
      page: current,
      size: size,
    };
    const res = useSWR<IApiRes<IPassengerData> | undefined>(['/v1/passenger', params], (url: string) =>
      swrFetch(url, params)
    );

    return res;
  },
  useAirline: () => {
    const res = useSWR<IApiRes<AirlineType[]> | undefined>('/v1/airlines', (url: string) => swrFetch(url));
    return res;
  },
  createPassenger: (name: string, trips: number, airline: number) => {
    return fetch<IApiRes<IPassengerData> | undefined>('/v1/passenger', METHOD.POST, {
      name: name,
      trips: trips,
      airline: airline,
    });
  },
  deletePassenger: (id: string) => {
    return fetch<string>(`/v1/passenger/${id}`, METHOD.DELETE);
  },
};

export default PassengerApiList;
