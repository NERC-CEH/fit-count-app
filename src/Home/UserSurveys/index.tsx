import { useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { Page, Main, Badge } from '@flumens';
import {
  IonHeader,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
} from '@ionic/react';
import InfoBackgroundMessage from 'common/Components/InfoBackgroundMessage';
import Sample from 'common/models/sample';
import samples from 'models/collections/samples';
import Survey from './components/Survey';
import './styles.scss';

// sort by created time, newest first
const byCreateTime = (m1: Sample, m2: Sample) => {
  const date1 = new Date(m1.createdAt);
  const date2 = new Date(m2.createdAt);
  return date2.getTime() - date1.getTime();
};

// functional component for UserSurveyComponent
const UserSurveyComponent = observer(() => {
  // segment state for tab selection
  const [segment, setSegment] = useState('pending');

  // handle segment change
  const onSegmentClick = useCallback((e: CustomEvent) => {
    setSegment(e.detail.value);
  }, []);

  // get samples list by upload status
  const getSamplesList = useCallback(
    (uploaded?: boolean) => {
      const byUploadStatus = (sample: Sample) =>
        uploaded ? !!sample.syncedAt : !sample.syncedAt;

      return samples.filter(byUploadStatus).sort(byCreateTime);
    },
    [samples]
  );

  // render surveys list
  const getSurveys = useCallback((surveys: Sample[]) => {
    return surveys.map(sample => <Survey key={sample.cid} sample={sample} />);
  }, []);

  // uploaded surveys section
  const getUploadedSurveys = useCallback(() => {
    const surveys = getSamplesList(true);

    if (!surveys.length) {
      return <InfoBackgroundMessage>No uploaded surveys</InfoBackgroundMessage>;
    }

    return getSurveys(surveys);
  }, [getSamplesList, getSurveys]);

  // pending surveys section
  const getPendingSurveys = useCallback(() => {
    const surveys = getSamplesList(false);
    const byMetadataSaved = (sample: Sample) => sample.metadata.saved;
    const finishedSurvey = surveys.find(byMetadataSaved);

    if (!surveys.length) {
      return (
        <InfoBackgroundMessage>
          You have no finished surveys.
        </InfoBackgroundMessage>
      );
    }

    if (finishedSurvey) {
      return (
        <>
          {getSurveys(surveys)}
          <InfoBackgroundMessage name="showSurveyUploadTip">
            Please do not forget to upload any pending surveys!
          </InfoBackgroundMessage>
        </>
      );
    }

    return (
      <>
        {getSurveys(surveys)}
        <InfoBackgroundMessage name="showSurveysDeleteTip">
          To delete any surveys swipe it to the left.
        </InfoBackgroundMessage>
      </>
    );
  }, [getSamplesList, getSurveys]);

  // pending surveys count badge
  const getPendingSurveysCount = useCallback(() => {
    const pendingSurveys = getSamplesList();

    if (!pendingSurveys.length) {
      return null;
    }

    return (
      <Badge
        color="warning"
        className="ml-1"
      >{`${pendingSurveys.length}`}</Badge>
    );
  }, [getSamplesList]);

  // uploaded surveys count badge
  const getUploadedSurveysCount = useCallback(() => {
    const uploadedSurveys = getSamplesList(true);

    if (!uploadedSurveys.length) {
      return null;
    }

    return <Badge className="ml-1">{`${uploadedSurveys.length}`}</Badge>;
  }, [getSamplesList]);

  // memoize which segment is showing
  const showingPending = segment === 'pending';
  const showingUploaded = segment === 'uploaded';

  // render component
  return (
    <Page id="home-user-surveys">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonSegment onIonChange={onSegmentClick} value={segment}>
            <IonSegmentButton value="pending">
              <IonLabel className="ion-text-wrap">
                <T>Pending</T>
                {getPendingSurveysCount()}
              </IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="uploaded">
              <IonLabel className="ion-text-wrap">
                <T>Uploaded</T>
                {getUploadedSurveysCount()}
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <Main>
        <IonList>
          {showingPending && getPendingSurveys()}
          {showingUploaded && getUploadedSurveys()}
        </IonList>
      </Main>
    </Page>
  );
});

export default UserSurveyComponent;
