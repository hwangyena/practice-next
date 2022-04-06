import { useState, MouseEvent } from 'react';
import { dummyHobby } from 'src/lib/dummy';
import { GlobalStore, ProfileStore } from 'src/store';
import { ProfileSearchDropDown } from '.';

// type Props = {};

const ProfileTable = () => {
  const { handleMasking } = GlobalStore.useContainer();
  const { profile, dispatchProfile } = ProfileStore.useContainer();

  const profileInTable = Object.keys(profile).map((v) => ({ label: v, value: profile[v as keyof typeof profile] }));

  // const [hobbies, setHobbies] = useState<string[]>([]);

  // const onAddTag = (tag: string) => {
  //   setHobbies((p) => [tag, ...p]);
  // };

  // const onDeleteTag = (tag: string) => {
  //   setHobbies((p) => p.filter((v) => tag !== v));
  // };

  const onMasking = (e: MouseEvent<HTMLTableDataCellElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const maskingText = window.getSelection()?.toString();
    if (!maskingText) return;
    handleMasking(true, e.pageX, e.pageY, maskingText);
  };

  return (
    <table>
      <tbody>
        {profileInTable.map((v) => (
          <tr key={v.label}>
            <th className="p-3 bg-slate-100 border-2">{v.label}</th>
            <td className="p-3 border-2 whitespace-pre" onContextMenu={onMasking}>
              {v.label === 'hobby' ? (
                <div className="flex gap-2 flex-col">
                  <div className="flex gap-1">
                    {profile.hobby.length === 0 ? (
                      <span className="text-sm text-slate-400 ">취미를 선택해주세요.</span>
                    ) : (
                      profile.hobby.map((v, i) => (
                        <span
                          className="w-fit bg-slate-200 rounded-lg p-1 leading-[15px] hover:bg-slate-300 cursor-pointer"
                          key={i}
                          onClick={() => dispatchProfile({ type: 'DELETE_HOBBY', tag: v })}
                        >
                          {v}
                        </span>
                      ))
                    )}
                  </div>
                  <ProfileSearchDropDown
                    options={dummyHobby.filter((v) => !profile.hobby.includes(v))}
                    onAddTag={(v: string) => dispatchProfile({ type: 'ADD_HOBBY', tag: v })}
                  />
                </div>
              ) : (
                v.value
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfileTable;
