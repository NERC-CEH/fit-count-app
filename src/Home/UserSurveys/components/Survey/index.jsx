import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { alert, date } from '@apps';
import { observer } from 'mobx-react';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonBadge,
  IonAvatar,
} from '@ionic/react';
import { Trans as T } from 'react-i18next';
import OnlineStatus from './components/OnlineStatus';
import ErrorMessage from './components/ErrorMessage';
import './styles.scss';

function deleteSurvey(sample) {
  alert({
    header: 'Delete',
    message: 'Are you sure you want to delete this survey?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'primary',
      },
      {
        text: 'Delete',
        cssClass: 'secondary',
        handler: () => sample.destroy(),
      },
    ],
  });
}

function getSampleInfo(sample) {
  const prettyDate = date.print(sample.attrs.date);

  return (
    <>
      <IonAvatar />

      <IonLabel position="stacked" mode="ios" color="dark">
        <IonLabel class="ion-text-wrap" color="danger">
          <T>Record</T>
        </IonLabel>
        <IonLabel class="ion-text-wrap">{prettyDate}</IonLabel>
      </IonLabel>
      <IonBadge color="medium" />
    </>
  );
}

const Survey = ({ sample }) => {
  const deleteSurveyWrap = () => deleteSurvey(sample);

  return (
    <IonItemSliding class="survey-list-item">
      <ErrorMessage sample={sample} />

      <IonItem detail>
        {getSampleInfo(sample)}
        <OnlineStatus sample={sample} />
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={deleteSurveyWrap}>
          <T>Delete</T>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

Survey.propTypes = exact({
  sample: PropTypes.object.isRequired,
});

export default observer(Survey);
