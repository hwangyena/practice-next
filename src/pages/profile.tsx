import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { ProfileTable } from 'src/components/profile';
import { GlobalStore, ProfileStore } from 'src/store';

const ProfileContextMenu = dynamic(() => import('src/components/profile/context-menu'));

export default function Profile() {
  const { masking, handleMasking } = GlobalStore.useContainer();

  useEffect(() => {
    const removeMasking = () => {
      handleMasking(false);
    };

    document.addEventListener('click', removeMasking);
    return () => {
      document.removeEventListener('click', removeMasking);
    };
  });

  return (
    <ProfileStore.Provider>
      <div className="p-5">
        <h3 className="mb-3">user profile</h3>
        <ProfileTable />
      </div>
      {masking.show && <ProfileContextMenu top={masking.ypos} left={masking.xpos} text={masking.text} />}
    </ProfileStore.Provider>
  );
}
