import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonProgressBar,
} from '@ionic/react';
import { Trans as T } from 'react-i18next';
import { observer } from 'mobx-react';
import surveyConfig from '../../config';
import BackButton from './BackButton';
import './styles.scss';

function CustomHeader({ onCancel, surveyProgressIndex, backButtonLabel }) {
  const { SURVEY_STEP_COUNT } = surveyConfig;

  return (
    <IonHeader id="survey-header">
      <IonToolbar>
        <IonButtons onClick={onCancel} slot="start">
          <BackButton onCancel={onCancel} backButtonLabel={backButtonLabel} />
        </IonButtons>

        <IonTitle>
          <b>{surveyProgressIndex}</b>{' '}
          <span>
            <T>of</T> {SURVEY_STEP_COUNT}
          </span>
        </IonTitle>

        <IonProgressBar
          color="secondary"
          value={surveyProgressIndex / SURVEY_STEP_COUNT}
        />
      </IonToolbar>
    </IonHeader>
  );
}

CustomHeader.propTypes = exact({
  surveyProgressIndex: PropTypes.number.isRequired,
  backButtonLabel: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
});

export default observer(CustomHeader);
