import type { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { useAlert, useToast, getRelativeDate } from '@flumens';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/react';
import { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import OnlineStatus from './components/OnlineStatus';
import './styles.scss';

function deleteSurvey(sample: any, alert: any) {
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

const uploadedSurveyMessage = (alert: any) => {
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

function getSampleInfo(sample: any) {
  const prettyDate = getRelativeDate(sample.createdAt);
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
        <IonLabel className="ion-text-wrap">
          <h2>
            <T>Survey</T>
          </h2>
        </IonLabel>
        <IonLabel className="ion-text-wrap">
          <T>{prettyDate}</T>
        </IonLabel>
      </IonLabel>
    </>
  );
}

// props type for Survey
export type SurveyProps = {
  sample: any;
};

// delete survey handler
const deleteSurveyWrap = (sample: any, alert: any) => () => {
  deleteSurvey(sample, alert);
};

// upload handler
const onUpload =
  (
    sample: any,
    checkUserStatus: () => Promise<boolean>,
    checkSampleStatus: () => boolean,
    toast: any
  ) =>
  async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // check user status
    const isUserOK = await checkUserStatus();

    if (!isUserOK) {
      return;
    }

    // check sample status
    const isValid = checkSampleStatus();

    if (!isValid) {
      return;
    }

    sample.upload().catch(toast.error);
  };

// main Survey component
const Survey = ({ sample }: SurveyProps) => {
  // get survey config
  const survey = sample.getSurvey();
  const toast = useToast();
  const alert = useAlert();
  const checkSampleStatus = useValidateCheck(sample);
  const checkUserStatus = useUserStatusCheck();

  const { synchronising } = sample.remote;
  const uploaded = sample.isUploaded;

  // build href for router link
  const href =
    !synchronising && !uploaded
      ? `/${survey.name}/new/${sample.cid}/location`
      : undefined;

  // handle click for uploaded survey
  const onClick = uploaded ? () => uploadedSurveyMessage(alert) : undefined;

  return (
    <IonItemSliding className="survey-list-item">
      <IonItem
        routerLink={href}
        onClick={onClick}
        detail={!synchronising && !uploaded}
      >
        {getSampleInfo(sample)}
        <OnlineStatus
          sample={sample}
          onUpload={onUpload(sample, checkUserStatus, checkSampleStatus, toast)}
        />
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={deleteSurveyWrap(sample, alert)}>
          <T>Delete</T>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default observer(Survey);
