import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { IonSpinner, IonLabel, IonButton } from '@ionic/react';
import { Badge } from 'common/flumens';
import Sample from 'common/models/sample';
import './styles.scss';

interface UsersSurveysProps {
  sample: Sample;
  onUpload: any;
}

// usersSurveys component displays survey status and upload button
const UsersSurveys = ({ onUpload, sample }: UsersSurveysProps) => {
  const { saved } = sample.metadata;

  // show draft badge if not saved
  if (!saved) {
    return <Badge>Draft</Badge>;
  }

  // show spinner if synchronising
  if (sample.isSynchronising) {
    return <IonSpinner class="survey-status" />;
  }

  // hide if already uploaded
  if (sample.isUploaded) {
    return null;
  }

  // show upload button
  return (
    <IonButton
      className="survey-status-upload"
      onClick={onUpload}
      fill="outline"
    >
      <IonLabel>
        <T>Upload</T>
      </IonLabel>
    </IonButton>
  );
};

export default observer(UsersSurveys);
