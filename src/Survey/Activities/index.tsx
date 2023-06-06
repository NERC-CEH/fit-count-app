import { FC, useContext, useState, useEffect } from 'react';
import { useTranslation, Trans as T } from 'react-i18next';
import { observer } from 'mobx-react';
import {
  Page,
  InfoBackgroundMessage,
  Main,
  InfoMessage,
  useToast,
  device,
  InfoButton,
  useLoader,
} from '@flumens';
import appModel, { ActivityProp } from 'models/app';
import { useUserStatusCheck } from 'models/user';
import Sample, { useValidateCheck } from 'models/sample';
import {
  NavContext,
  IonItem,
  IonIcon,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonRadio,
  IonRadioGroup,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItemDivider,
} from '@ionic/react';
import {
  checkmarkOutline,
  informationCircleOutline,
  openOutline,
} from 'ionicons/icons';
import helpIcon from './images/helpIcon.jpg';
import surveyStatistics from './surveyStatistics.json';
import CustomAlert from '../Components/CustomAlert';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import syncActivities from './services';
import './styles.scss';

const PAGE_INDEX = 11;

type Props = {
  sample: Sample;
};

const ActivityController: FC<Props> = ({ sample }) => {
  const { navigate } = useContext(NavContext);
  const { t } = useTranslation();
  const toast = useToast();
  const loader = useLoader();
  const checkSampleStatus = useValidateCheck(sample);
  const checkUserStatus = useUserStatusCheck();

  const [showThanks, setShowThanks] = useState(false);

  const { country, activities } = appModel.attrs;
  const isUK = country === 'UK';
  const isRestOfWorld = !isUK;

  const countryActivities = Array.isArray(activities) && activities?.length;

  const numberOfOccurrences = sample.getInsectCount();

  const englishFormat = Intl.DateTimeFormat('en', { month: 'long' });

  const englishMonth = englishFormat.format(
    new Date(sample.metadata.created_on)
  );

  const _processDraft = async () => {
    appModel.attrs['draftId:survey'] = '';
    await appModel.save();

    // eslint-disable-next-line no-param-reassign
    sample.metadata.saved = true;
    sample.save();
  };

  const goHome = () => navigate('/home/surveys', 'root');

  const uploadSurvey = async () => {
    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    const isValid = checkSampleStatus();
    if (!isValid) return;

    sample.upload().catch(toast.error);

    goHome();
  };

  const onFinish = async () => {
    if (!sample.metadata.saved) {
      await _processDraft();
    }

    setShowThanks(true);
  };

  const isValueValid = () => !!sample.attrs['weather-wind'];

  const getAverageInsectCount = (month: any) => {
    const byMonth = (obj: any) => obj.month_name === month;

    const insectsData = surveyStatistics.find(byMonth);
    if (!insectsData) return null;

    return parseFloat(insectsData.average as any).toFixed(0);
  };
  const month = t(englishMonth);
  const averageInsectCountForThisMonth = getAverageInsectCount(month);

  const syncActivitiesForTheFirstTime = () => {
    const isActivitiesSynced = activities !== null;
    if (isActivitiesSynced) return;

    syncActivities(loader, toast);
  };
  useEffect(syncActivitiesForTheFirstTime, []);

  const refreshReport = async () => {
    if (!device.isOnline) {
      toast.warn("Sorry, looks like you're offline.");
      return;
    }

    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    syncActivities(loader, toast);
  };

  const onListRefreshPull = (e: any) => {
    refreshReport();
    e?.detail?.complete(); // refresh pull update
  };

  const onChange = (e: any) => {
    // eslint-disable-next-line no-param-reassign
    sample.attrs.activity = e.detail.value;
    sample.save();
  };

  const byPastActivity = (activity: any) =>
    activity.id === appModel.attrs.pastActivity;

  const byNonFavorite = (activity: any) =>
    activity.id !== appModel.attrs.pastActivity;

  const activitiesList = appModel.attrs.activities?.length
    ? [...appModel.attrs.activities]
    : [];

  const favoriteActivities = activitiesList.filter(byPastActivity);
  const remainingActivities = activitiesList.filter(byNonFavorite);

  const getActivityEntries = (activitiesData: ActivityProp[]) => {
    const alphabetically = (activityA: ActivityProp, activityB: ActivityProp) =>
      activityA.name.localeCompare(activityB.name);

    return activitiesData.sort(alphabetically).map((activity: ActivityProp) => {
      const { name, id, website_url } = activity;

      const navigateTo = () => {
        window.location.href = website_url;
      };

      return (
        <IonItemSliding>
          <IonItemOptions side="start" className="copy-slider">
            <IonItemOption color="tertiary" onClick={navigateTo}>
              <IonIcon icon={openOutline} />
            </IonItemOption>
          </IonItemOptions>
          <IonItem
            key={`${name} + ${id}`}
            className="radio-input-default-option"
          >
            <IonLabel>{name}</IonLabel>
            <IonRadio value={name} />
          </IonItem>
        </IonItemSliding>
      );
    });
  };

  const getActivitiesList = () => {
    if (!activities) {
      return (
        <InfoBackgroundMessage>
          Please pull down the page to see projects list.
        </InfoBackgroundMessage>
      );
    }

    if (!countryActivities) {
      return (
        <InfoBackgroundMessage>
          Your selected country does not have any projects.
        </InfoBackgroundMessage>
      );
    }

    return (
      <IonList lines="full" className="radio-input-attr">
        <IonRadioGroup allowEmptySelection onIonChange={onChange}>
          {appModel.attrs.pastActivity && (
            <>
              <IonItemDivider mode="ios" className="survey-divider">
                <div>
                  <T>My past project</T>
                </div>
              </IonItemDivider>

              {getActivityEntries(favoriteActivities)}
            </>
          )}

          <IonItemDivider mode="ios" className="survey-divider">
            <div>
              <T>Projects list</T>
            </div>
          </IonItemDivider>
          {getActivityEntries(remainingActivities)}
        </IonRadioGroup>
      </IonList>
    );
  };

  return (
    <Page id="survey-activities-page">
      <Header
        sample={sample}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Strength"
      />

      <Main>
        <InfoMessage
          icon={informationCircleOutline}
          className="info-message"
          skipTranslation
        >
          <T>
            Do you participate in the other <b>project</b>?
          </T>
          <InfoButton label="Information" header="Info" skipTranslation>
            <p>
              <T>To refresh projects list pull page down.</T>
            </p>

            <p>
              <T>
                To access more information about the project, please swipe
                project to the right.
              </T>
            </p>

            <img src={helpIcon} className="helpIcon" />
          </InfoButton>
        </InfoMessage>

        <IonRefresher slot="fixed" onIonRefresh={onListRefreshPull}>
          <IonRefresherContent />
        </IonRefresher>

        {getActivitiesList()}
      </Main>

      {isValueValid() && <Footer title="Save my count" onClick={onFinish} />}

      {showThanks && (
        <CustomAlert>
          <div className="center">
            <IonIcon icon={checkmarkOutline} />
          </div>

          <h3>
            <T>
              Thanks for completing your FIT Count - all results help us to
              monitor insect populations.
            </T>
          </h3>

          {!!averageInsectCountForThisMonth && isUK && (
            <p>
              <T>
                You counted <b>{{ numberOfOccurrences }} </b>insect(s)
                altogether - the UK average for <b>{{ month }}</b> is{' '}
                <b>{{ averageInsectCountForThisMonth }}</b> insects per count.
              </T>
            </p>
          )}

          {isRestOfWorld && (
            <p>
              <T>
                You counted <b>{{ numberOfOccurrences }} </b>insect(s)
                altogether.
              </T>
            </p>
          )}

          <div className="button-wrapper">
            <IonItem
              color="secondary"
              onClick={uploadSurvey}
              className="next-button"
              lines="none"
            >
              <IonLabel>
                <T>Upload</T>
              </IonLabel>
            </IonItem>

            <IonItem
              color="medium"
              onClick={goHome}
              className="next-button home"
              lines="none"
            >
              <IonLabel>
                <T>Go Home</T>
              </IonLabel>
            </IonItem>
          </div>
        </CustomAlert>
      )}
    </Page>
  );
};

export default observer(ActivityController);
