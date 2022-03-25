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
  eamil: string;
  gender: GenderType;
  status: string;
};

type ProfileType = {
  name: string;
  phone: string;
  comment: string;
};
