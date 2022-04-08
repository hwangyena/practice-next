import { useEffect, useReducer, useState } from 'react';
import { dummyUser } from 'src/lib/dummy';
import { createContainer } from 'unstated-next';
import styles from 'src/styles/profile.module.css';

interface IProfileAction {
  type: 'MASKING' | 'DELETE_HOBBY' | 'ADD_HOBBY';
  tag?: string;
  maskingText?: string;
  maskingStart?: number;
  maskingEnd?: number;
}

const initialProfile: ProfileType = dummyUser;

const profileReducer = (state: ProfileType, action: IProfileAction): ProfileType => {
  switch (action.type) {
    case 'MASKING':
      //우선 description만 작업
      const { maskingStart, maskingEnd, maskingText } = action;
      const maskingArea =
        state.description.slice(0, maskingStart) +
        `<b class="${styles.masking} masking">` +
        maskingText +
        '</b>' +
        state.description.slice(maskingEnd);
      console.log('maskingArea', maskingArea);

      return { ...state, description: maskingArea };
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

  useEffect(() => {
    const onClickMasking = (e: MouseEvent) => {
      if (!(e.target as Element).classList.contains('masking')) {
        return;
      }
      e.stopPropagation();
      console.log('click', e.target);
    };

    document.addEventListener('click', onClickMasking);
    return () => document.removeEventListener('click', onClickMasking);
  });

  return {
    profile,
    dispatchProfile,
  };
};

const ProfileStore = createContainer(useProfile);

export default ProfileStore;
