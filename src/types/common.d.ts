type RequestForm = {
  method: 'GET' | 'POST';
  path: string;
  params?: Record<string, unknown> | FormData;
};

type FetchErrorType = {
  status: number;
  statusText: string;
  code: string;
  isFetchError: boolean;
};

type GenderType = 'male' | 'female';

type UserType = {
  id: number;
  name: string;
  gender: GenderType;
  email: string;
  status: string;
};

type AirlineType = {
  id: number;
  country: string;
  established: string;
  head_quaters: string;
  logo: string;
  name: string;
  slogan: string;
  website: string;
  _id: string;
};

type PassengerType = {
  id: string;
  airline: AirlineType[];
  name: string;
  trips: number;
};
