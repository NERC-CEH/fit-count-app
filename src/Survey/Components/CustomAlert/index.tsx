import { IonBackdrop } from '@ionic/react';
import './styles.scss';
import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

function CustomAlert({ children, className }: Props) {
  return (
    <div className={clsx('custom-alert', className)}>
      <IonBackdrop tappable visible stopPropagation />
      <div className="message">{children}</div>
    </div>
  );
}

export default CustomAlert;
