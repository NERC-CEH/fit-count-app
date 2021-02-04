import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { IonBackButton, IonButton } from '@ionic/react';
import { Trans as T } from 'react-i18next';

const BackButton = ({ onCancel, backButtonLabel }) => (
  <>
    {onCancel && (
      <IonButton>
        <T>{backButtonLabel}</T>
      </IonButton>
    )}
    {!onCancel && (
      <IonBackButton text={backButtonLabel} defaultHref="/home/info" />
    )}
  </>
);

BackButton.propTypes = exact({
  onCancel: PropTypes.func,
  backButtonLabel: PropTypes.string.isRequired,
});

export default BackButton;
