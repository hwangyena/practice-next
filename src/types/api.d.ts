interface IApiRes {
  data: {
    totalPages: number;
    totalPasseners: number;
    data: PassengerType[];
  };
  status: number;
  statusText: string;
}

interface IApiParams {
  page: number;
  size: number;
}
