import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(callback: () => void, whenMouseDown = false) => {
  const container = useRef<T>(null);
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleOutsideClicked = (e: MouseEvent) => {
      if (savedCallback.current == null) {
        return;
      }

      if (container.current && e.target != null) {
        if ((e.target as Node).contains(container.current)) {
          savedCallback.current();
        }
      }
    };

    document.addEventListener(whenMouseDown ? 'mousedown' : 'click', handleOutsideClicked);

    return () => document.removeEventListener(whenMouseDown ? 'mousedown' : 'click', handleOutsideClicked);
  }, [whenMouseDown]);

  return container;
};
