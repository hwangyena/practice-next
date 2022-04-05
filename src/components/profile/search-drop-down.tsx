import React, { MouseEvent, useState, FocusEvent } from 'react';
import PlusCircle from 'public/images/plus-circle.svg';

type Props = {
  options: string[];
  onAddTag: (v: string) => void;
};

const ProfileSearchDropDown = ({ options, onAddTag }: Props) => {
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);

  const onSetSearch = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>, value: string) => {
    setSearch(value);
  };

  const onAddItem = (e: MouseEvent<HTMLLIElement, MouseEvent>) => {
    onAddTag(search);
    setSearch('');
  };

  const onBlur = (e: FocusEvent<HTMLButtonElement, Element>) => {
    // e.stopPropagation();
    e.preventDefault();
    setFocus(false);
  };

  return (
    <button className="relative min-w-[180px] p-0" onFocus={() => setFocus(true)} onBlur={onBlur}>
      <div className="relative flex border-2 rounded-md items-center cursor-pointer px-2 w-full  justify-between border-slate-200 outline-none">
        <input
          className="border-none  outline-none"
          placeholder=""
          value={search}
          onFocus={() => setFocus(true)}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <PlusCircle className="h-5 w-5 text-slate-300 hover:text-slate-500 absolute right-1" onClick={onAddItem} />
        )}
      </div>
      {focus && (
        <ul className="absolute flex mt-1 flex-col w-full border-2 border-slate-100 bg-white rounded-md">
          {options
            .filter((v) => v.includes(search))
            .map((v, i) => (
              <li
                key={i}
                className="p-2 cursor-pointer hover:bg-slate-100 text-left flex items-center justify-between"
                onClick={(e) => onSetSearch(e, v)}
              >
                <span>{v}</span>
              </li>
            ))}
        </ul>
      )}
    </button>
  );
};

export default ProfileSearchDropDown;
