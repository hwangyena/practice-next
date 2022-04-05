import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useUser = () => {
  const [name, setName] = useState('');
  const [hobbyTag, setHobbyTag] = useState([]);

  return {
    name,
    hobbyTag,
  };
};

const UserStore = createContainer(useUser);

export default UserStore;
