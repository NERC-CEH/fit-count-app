import { useTranslation, Trans as T } from 'react-i18next';
import { IonBackButton, IonButton } from '@ionic/react';

type Props = {
  onCancel?: () => void;
  backButtonLabel: string;
};

const BackButton = ({ onCancel, backButtonLabel }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {onCancel && (
        <IonButton>
          <T>{backButtonLabel}</T>
        </IonButton>
      )}
      {!onCancel && (
        <IonBackButton text={t(backButtonLabel)} defaultHref="/home/info" />
      )}
    </>
  );
};

export default BackButton;
