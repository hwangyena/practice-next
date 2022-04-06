import { useReducer, useState } from 'react';
import { dummyUser } from 'src/lib/dummy';
import { createContainer } from 'unstated-next';

interface IProfileAction {
  type: 'MASKING' | 'DELETE_HOBBY' | 'ADD_HOBBY';
  tag?: string;
}

const initialProfile: ProfileType = dummyUser;

const profileReducer = (state: ProfileType, action: IProfileAction): ProfileType => {
  switch (action.type) {
    case 'MASKING':
      //우선 description만 작업
      return { ...state };
    case 'ADD_HOBBY':
      return { ...state, hobby: [action.tag || '', ...state.hobby] };
    case 'DELETE_HOBBY':
      return { ...state, hobby: state.hobby.filter((v) => v !== action.tag) };
    default:
      return state;
  }
};

const useProfile = () => {
  const [profile, dispatchProfile] = useReducer(profileReducer, initialProfile);

  // const handleMasking = () => {

  // }

  return {
    profile,
    dispatchProfile,
  };
};

const ProfileStore = createContainer(useProfile);

export default ProfileStore;
