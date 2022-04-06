import { MouseEvent, useEffect } from 'react';
import { dummyHobby } from 'src/lib/dummy';
import { GlobalStore, ProfileStore } from 'src/store';
import { ProfileSearchDropDown } from '.';

// type Props = {};

const ProfileTable = () => {
  const { handleMasking } = GlobalStore.useContainer();
  const { profile, dispatchProfile } = ProfileStore.useContainer();

  const profileInTable = Object.keys(profile).map((v) => ({ label: v, value: profile[v as keyof typeof profile] }));

  const onMasking = (e: MouseEvent<HTMLTableDataCellElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    const maskingText = window.getSelection()?.toString();
    if (!maskingText) return;

    const selection = document.getSelection();

    for (let i = 0; i < (selection?.rangeCount ?? 0); i++) {
      console.log('getRange', selection?.getRangeAt(i).cloneContents());
    }
    // console.log('anchorNode', window.getSelection()?.anchorNode);
    // console.log('anchorOffset', window.getSelection()?.anchorOffset);
    // console.log('focusNode', window.getSelection()?.focusNode);
    // console.log('focusOffset', window.getSelection()?.focusOffset);
    // console.log('rangeCount', window.getSelection()?.rangeCount);

    //시작 & 끝지점
    const maskingStart = Math.min(window.getSelection()?.anchorOffset ?? 0, window.getSelection()?.focusOffset ?? 0);
    const maskingEnd = Math.max(window.getSelection()?.anchorOffset ?? 0, window.getSelection()?.focusOffset ?? 0);

    // handleMasking(true, e.pageX, e.pageY, maskingText);
    handleMasking({ show: true, xpos: e.pageX, ypos: e.pageY, maskingText, maskingStart, maskingEnd });
  };

  return (
    <table>
      <tbody>
        {profileInTable.map((v) => (
          <tr key={v.label}>
            <th className="p-3 bg-slate-100 border-2">{v.label}</th>
            <td className="p-3 border-2 whitespace-pre" onContextMenu={onMasking}>
              {v.label === 'hobby' ? (
                // 취미
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
              ) : // masking
              v.label === 'description' ? (
                <div dangerouslySetInnerHTML={{ __html: String(v.value) }} />
              ) : (
                // v.value
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
