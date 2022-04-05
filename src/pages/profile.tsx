import { useState } from 'react';
import { DropDown } from 'src/components/custom';
import { dummyHobby, dummyUser } from 'src/lib/dummy';
import { UserStore } from 'src/store';

export default function Profile() {
  const [hobby, setHobby] = useState('');
  const user = Object.keys(dummyUser).map((v) => ({ label: v, value: dummyUser[v as keyof typeof dummyUser] }));
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
                    <DropDown options={dummyHobby} onSelect={(v) => setHobby(v)} value={hobby} />
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
