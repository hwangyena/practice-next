import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useGlobal = () => {
  const [visible, setIsVisible] = useState(false);
  const [masking, setMasking] = useState<{ xpos: number; ypos: number; show: boolean; text: string }>({
    xpos: 0,
    ypos: 0,
    show: false,
    text: '',
  });

  const toogleVisible = () => {
    setIsVisible((p) => !p);
  };

  const handleMasking = (show: boolean, x?: number, y?: number, text?: string) => {
    setMasking({ xpos: x ?? 0, ypos: y ?? 0, show, text: text ?? '' });
  };

  return {
    visible,
    masking,
    toogleVisible,
    handleMasking,
  };
};

const GlobalStore = createContainer(useGlobal);

export default GlobalStore;
