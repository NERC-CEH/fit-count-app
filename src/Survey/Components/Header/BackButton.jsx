import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { useTranslation, Trans as T } from 'react-i18next';
import { IonBackButton, IonButton } from '@ionic/react';

const BackButton = ({ onCancel, backButtonLabel }) => {
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

BackButton.propTypes = exact({
  onCancel: PropTypes.func,
  backButtonLabel: PropTypes.string.isRequired,
});

export default BackButton;
