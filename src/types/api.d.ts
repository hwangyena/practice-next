interface IPassengerData {
  totalPages: number;
  totalPasseners: number;
  data: PassengerType[];
}

interface IApiRes<T> {
  data: T;
  status: number;
  statusText: string;
  isValidating?: boolean; // loading
}

interface IApiParams {
  page: number;
  size: number;
}
