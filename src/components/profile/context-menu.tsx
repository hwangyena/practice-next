import React from 'react';

type Props = {
  top: number;
  left: number;
  text: string;
};

const ProfileContextMenu = ({ left, top, text }: Props) => {
  const menuList = [
    {
      label: '복사',
      onClick: () => {
        navigator.clipboard.writeText(text);
      },
    },
    {
      label: '마스킹하기',
      onClick: (e: any) => {
        console.log('masking');
      },
    },
  ];

  return (
    <ul className="bg-slate-100 fixed drop-shadow-lg p-1 rounded-md" style={{ top: `${top}px`, left: `${left}px` }}>
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
