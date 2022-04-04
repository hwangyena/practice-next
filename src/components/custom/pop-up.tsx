import { ReactNode } from 'react';
import { CloseButton } from '.';
import styles from 'src/styles/custom.module.css';

type Props = {
  title?: string;
  children: ReactNode;
  visible: boolean;
  onCancel: () => void;
};

const PopUp = ({ children, title, onCancel, visible }: Props) => {
  return visible ? (
    <div className={styles.popup}>
      <div className={styles['popup-back']} onClick={onCancel} />
      <div className={styles['popup-container']}>
        {title && <h2 className=" mb-5 text-center">{title}</h2>}
        <CloseButton onClose={onCancel} />
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PopUp;
