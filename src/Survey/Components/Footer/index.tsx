import { FC } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { flagOutline, chevronForwardOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { IonItem, IonLabel, IonFooter, IonIcon } from '@ionic/react';
import './styles.scss';

type Props = {
  link?: string;
  onClick?: any;
  title?: string;
  className?: string;
};

const Footer: FC<Props> = ({ link, title, onClick, className }) => {
  const navigateTo = link || undefined;

  const footerTitle = title || 'Next';

  const isFinish = !!onClick;
  const icon = isFinish ? flagOutline : chevronForwardOutline;

  return (
    <IonFooter className="ion-no-border">
      <div id="survey-footer">
        <IonItem
          lines="none"
          className={clsx('next-button', title && 'finish-button', className)}
          routerLink={navigateTo}
          routerOptions={{ unmount: true }}
          onClick={onClick}
          mode="md"
        >
          <IonIcon slot="end" color="light" icon={icon} />
          <IonLabel className="ion-text-center">
            <T>{footerTitle}</T>
          </IonLabel>
        </IonItem>
      </div>
    </IonFooter>
  );
};

export default observer(Footer);
