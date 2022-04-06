import React from 'react';
import { ProfileStore } from 'src/store';

type Props = {
  masking: MaskingType;
};

const ProfileContextMenu = ({ masking }: Props) => {
  const { maskingEnd, maskingStart, maskingText, show, xpos, ypos } = masking;
  const { dispatchProfile } = ProfileStore.useContainer();

  const menuList = [
    {
      label: '복사',
      onClick: () => {
        navigator.clipboard.writeText(maskingText);
      },
    },
    {
      label: '마스킹하기',
      onClick: () => {
        // const maskingStart = Math.min(
        //   window.getSelection()?.anchorOffset ?? 0,
        //   window.getSelection()?.focusOffset ?? 0
        // );
        // const maskingEnd = Math.max(window.getSelection()?.anchorOffset ?? 0, window.getSelection()?.focusOffset ?? 0);

        console.log('start', maskingStart);
        console.log('end', maskingEnd);

        dispatchProfile({ type: 'MASKING', maskingStart, maskingEnd, maskingText });
      },
    },
  ];

  return (
    <ul className="bg-slate-100 fixed drop-shadow-lg p-1 rounded-md" style={{ top: `${ypos}px`, left: `${xpos}px` }}>
      {menuList.map((v, i) => (
        <li
          className=" text-xs p-1 hover:bg-slate-400 hover:text-white cursor-pointer  rounded-md  min-w-[80px]"
          key={i}
          onClick={v.onClick}
        >
          {v.label}
        </li>
      ))}
    </ul>
  );
};

export default ProfileContextMenu;
