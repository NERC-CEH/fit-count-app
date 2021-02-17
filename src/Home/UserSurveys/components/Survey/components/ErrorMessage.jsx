import React from 'react';
import { IonItemDivider, IonLabel } from '@ionic/react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Trans as T } from 'react-i18next';

function ErrorMessage({ sample }) {
  if (!sample.error.message) {
    return null;
  }

  return (
    <IonItemDivider color="danger">
      <IonLabel class="ion-text-wrap">
        <T>
          <b>Upload</b> {sample.error.message}
        </T>
      </IonLabel>
    </IonItemDivider>
  );
}

ErrorMessage.propTypes = {
  sample: PropTypes.object.isRequired,
};

export default observer(ErrorMessage);
