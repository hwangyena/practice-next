import { useState } from 'react';
import { createContainer } from 'unstated-next';

const usePassenger = () => {
  const [selectPassenger, setSelectPassenger] = useState(-1);

  return {
    selectPassenger: selectPassenger,
    setSelectPassenger: setSelectPassenger,
  };
};

const PassengerStore = createContainer(usePassenger);

export default PassengerStore;
