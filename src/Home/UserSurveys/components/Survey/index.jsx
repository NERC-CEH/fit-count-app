import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { alert, date, device, toast } from '@apps';
import userModel from 'models/user';
import { observer } from 'mobx-react';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonBadge,
} from '@ionic/react';
import { Trans as T, useTranslation } from 'react-i18next';
import OnlineStatus from './components/OnlineStatus';
import './styles.scss';

const { warn } = toast;

function deleteSurvey(sample) {
  alert({
    header: 'Delete',
    message: <T>Are you sure you want to delete this survey?</T>,
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
  const insectCount = sample.getInsectCount();

  return (
    <>
      <div className="count">
        <div className="number">{insectCount}</div>
        <div className="label">
          <T>Insects</T>
        </div>
      </div>

      <IonLabel mode="ios" color="dark">
        <IonLabel class="ion-text-wrap">
          <h2>
            <T>Survey</T>
          </h2>
        </IonLabel>
        <IonLabel class="ion-text-wrap">{prettyDate}</IonLabel>
      </IonLabel>
      <IonBadge color="medium" />
    </>
  );
}

const Survey = ({ sample }) => {
  const { t } = useTranslation();
  const survey = sample.getSurvey();

  const { synchronising } = sample.remote;
  const uploaded = sample.isUploaded();

  const href =
    !synchronising && !uploaded && `/${survey.name}/new/${sample.cid}/location`;

  const deleteSurveyWrap = () => deleteSurvey(sample);
  const onUpload = async e => {
    e.preventDefault();
    e.stopPropagation();

    if (!device.isOnline()) {
      warn(t('Looks like you are offline!'));
      return;
    }

    const isActivated = await userModel.checkActivation();
    if (!isActivated) {
      return;
    }

    sample.upload();
  };

  return (
    <IonItemSliding class="survey-list-item">
      <IonItem routerLink={href} detail={!synchronising && !uploaded}>
        {getSampleInfo(sample)}
        <OnlineStatus sample={sample} onUpload={onUpload} />
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
