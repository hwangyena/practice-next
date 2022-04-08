import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GlobalStore } from 'src/store';

/**
 * beforeUnloadEvent & Router move Event Detect
 *
 * @param callback Is have to show modal
 */
export default function UsePageLoad(callback: () => boolean = () => false) {
  const router = useRouter();
  const { toogleVisible, moveUrl } = GlobalStore.useContainer();

  useEffect(() => {
    const handleUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handleRoute = (path: string) => {
      moveUrl.current = path;

      if (callback()) {
        toogleVisible(true);

        router.events.emit('routeChangeError');
        throw `routeChange aborted.`; //router event prevent
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    router.events.on('routeChangeStart', handleRoute);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      router.events.off('routeChangeStart', handleRoute);
    };
  }, []);
}
