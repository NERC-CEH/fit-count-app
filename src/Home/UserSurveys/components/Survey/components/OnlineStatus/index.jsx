import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Trans as T } from 'react-i18next';
import { IonSpinner, IonLabel, IonChip, IonButton } from '@ionic/react';
import './styles.scss';

const UsersSurveys = ({ onUpload, sample }) => {
  const { saved } = sample.metadata;

  if (!saved) {
    return (
      <IonLabel slot="end" class="survey-status">
        <IonChip color="dark" class="ion-text-wrap">
          <T>Draft</T>
        </IonChip>
      </IonLabel>
    );
  }

  if (sample.remote.synchronising) {
    return <IonSpinner class="survey-status" />;
  }

  if (sample.isUploaded()) {
    return null;
  }

  return (
    <IonButton class="survey-status-upload" onClick={onUpload} fill="outline">
      <IonLabel>
        <T>Upload</T>
      </IonLabel>
    </IonButton>
  );
};

UsersSurveys.propTypes = {
  sample: PropTypes.object.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default observer(UsersSurveys);
