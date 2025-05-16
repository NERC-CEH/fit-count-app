import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonProgressBar,
} from '@ionic/react';
import Sample from 'models/sample';
import BackButton from './BackButton';
import './styles.scss';

type Props = {
  sample: Sample;
  onCancel?: any;
  backButtonLabel: any;
  surveyProgressIndex: any;
  rightSlot?: any;
};

const SurveyHeader = (
  {
    onCancel,
    surveyProgressIndex,
    backButtonLabel,
    rightSlot,
    sample
  }: Props
) => {
  const surveyStepCount = sample.getSurveyStepCount();

  return (
    <IonHeader id="survey-header">
      <IonToolbar>
        <IonButtons onClick={onCancel} slot="start">
          <BackButton onCancel={onCancel} backButtonLabel={backButtonLabel} />
        </IonButtons>

        <IonTitle>
          <b>{surveyProgressIndex}</b>{' '}
          <span>
            <T>of</T> {surveyStepCount}
          </span>
        </IonTitle>

        <IonProgressBar
          color="secondary"
          value={surveyProgressIndex / surveyStepCount}
        />

        {rightSlot}
      </IonToolbar>
    </IonHeader>
  );
};

export default observer(SurveyHeader);
