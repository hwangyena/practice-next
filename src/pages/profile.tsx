import { useEffect, useState } from 'react';
import { DropDown, SearchDropDown } from 'src/components/custom';
import { dummyHobby, dummyUser } from 'src/lib/dummy';
import { UserStore } from 'src/store';

export default function Profile() {
  const [hobbies, setHobbies] = useState<string[]>([]);
  const user = Object.keys(dummyUser).map((v) => ({ label: v, value: dummyUser[v as keyof typeof dummyUser] }));

  const onAddTag = (tag: string) => {
    setHobbies((p) => [tag, ...p]);
  };

  const onDeleteTag = (tag: string) => {
    setHobbies((p) => p.filter((v) => tag !== v));
  };

  return (
    <UserStore.Provider>
      <div className="p-5">
        <h3 className="mb-3">user profile</h3>
        <table>
          <tbody>
            {user.map((v) => (
              <tr key={v.label}>
                <th className="p-3 bg-slate-100 border-2">{v.label}</th>
                <td className="p-3 border-2">
                  {v.label === 'hobby' ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-1">
                        {hobbies.length === 0 ? (
                          <span className="text-sm text-slate-400 ">취미를 선택해주세요.</span>
                        ) : (
                          hobbies.map((v, i) => (
                            <span
                              className="w-fit bg-slate-200 rounded-lg p-1 leading-[15px] hover:bg-slate-300 cursor-pointer"
                              key={i}
                              onClick={() => onDeleteTag(v)}
                            >
                              {v}
                            </span>
                          ))
                        )}
                      </div>
                      <SearchDropDown options={dummyHobby.filter((v) => !hobbies.includes(v))} {...{ onAddTag }} />
                    </div>
                  ) : (
                    v.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UserStore.Provider>
  );
}
