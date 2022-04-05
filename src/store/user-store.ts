import { useReducer, useState } from 'react';
import { dummyUser } from 'src/lib/dummy';
import { createContainer } from 'unstated-next';

interface IUserAction {
  type: 'MASKING' | 'DELETE_HOBBY' | 'UPDATE_HOBBY';
}

type UserType = {
  name: string;
  height: number;
  location: string;
  hobby: string[];
  description: string;
};

// type UserType = {
//   label: string;
//   value: string | string[] | number;
// };

const initialUser: UserType[] = Object.keys(dummyUser).map((v) => ({
  label: v,
  value: dummyUser[v as keyof typeof dummyUser],
}));

const userReducer = (state: UserType[], action: IUserAction) => {
  switch (action.type) {
    case 'MASKING':
      return {};
    case 'UPDATE_HOBBY':
      return {};
    case 'DELETE_HOBBY':
      return {};
    default:
      return state;
  }
};

const useUser = () => {
  // const [user, setUser] = useState(
  //   Object.keys(dummyUser).map((v) => ({ label: v, value: dummyUser[v as keyof typeof dummyUser] }))
  // );

  const [user, dispatchUser] = useReducer(userReducer, initialUser);

  // const handleMasking = () => {

  // }

  // const handleHobbies = () => {
  //   setUser(p=>p.map(v=>v.label==='hobby' ? {...v,value:} : v))
  // }

  return {
    user,
  };
};

const UserStore = createContainer(useUser);

export default UserStore;
