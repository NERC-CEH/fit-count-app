import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Trans as T } from 'react-i18next';
import { useAlert, date, useToast } from '@flumens';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonBadge,
} from '@ionic/react';
import { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import OnlineStatus from './components/OnlineStatus';
import './styles.scss';

function deleteSurvey(sample, alert) {
  alert({
    header: 'Delete',
    message: <T>Are you sure you want to delete this survey?</T>,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => sample.destroy(),
      },
    ],
  });
}

const uploadedSurveyMessage = alert => {
  alert({
    message: (
      <T>
        To view your FIT Count data after uploading please visit the project
        website for your country, where available (e.g.{' '}
        <a href="http://ukpoms.org.uk/">UK PoMS</a>)
      </T>
    ),
    buttons: [
      {
        text: 'OK, got it',
        role: 'cancel',
      },
    ],
  });
};

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
  const survey = sample.getSurvey();
  const toast = useToast();
  const alert = useAlert();
  const checkSampleStatus = useValidateCheck(sample);
  const checkUserStatus = useUserStatusCheck();

  const { synchronising } = sample.remote;
  const uploaded = sample.isUploaded();

  const href =
    !synchronising && !uploaded && `/${survey.name}/new/${sample.cid}/location`;

  const deleteSurveyWrap = () => deleteSurvey(sample, alert);
  const onUpload = async e => {
    e.preventDefault();
    e.stopPropagation();

    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    const isValid = checkSampleStatus();
    if (!isValid) return;

    sample.upload().catch(toast.error);
  };

  const onClick = uploaded ? () => uploadedSurveyMessage(alert) : undefined;

  return (
    <IonItemSliding class="survey-list-item">
      <IonItem
        routerLink={href}
        onClick={onClick}
        detail={!synchronising && !uploaded}
      >
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
