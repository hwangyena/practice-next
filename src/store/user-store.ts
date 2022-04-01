import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useUser = () => {
  const [selectUser, setSelectUser] = useState(-1);

  return {
    selectUser,
    setSelectUser,
  };
};

const UserStore = createContainer(useUser);

export default UserStore;
