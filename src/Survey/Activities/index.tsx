import { FC, useState, useEffect, useContext } from 'react';
import { Trans as T } from 'react-i18next';
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
  NavContext,
} from '@ionic/react';
import { informationCircleOutline, openOutline } from 'ionicons/icons';
import helpIcon from './images/helpIcon.jpg';
import ThankYouAlert from './ThankYouAlert';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import syncActivities from './services';
import unPinIcon from './unpinIcon.svg';
import './styles.scss';

const PAGE_INDEX = 11;

type Props = {
  sample: Sample;
};

const ActivityController: FC<Props> = ({ sample }) => {
  const { navigate } = useContext(NavContext);
  const toast = useToast();
  const loader = useLoader();
  const checkUserStatus = useUserStatusCheck();
  const checkSampleStatus = useValidateCheck(sample);

  const [showThanks, setShowThanks] = useState(false);

  const { activities } = appModel.attrs;

  const countryActivities = Array.isArray(activities) && activities?.length;

  const setPastActivity = () => {
    const currentSelectedActivityId = sample.attrs.activity?.id;

    appModel.attrs.pastActivities.push(currentSelectedActivityId);

    const pastActivities = [...appModel.attrs.pastActivities];

    const uniqueActivities = new Set(pastActivities);

    const uniquePastActivitiesIds = [...uniqueActivities];

    appModel.attrs.pastActivities = uniquePastActivitiesIds;
    appModel.save();
  };

  const _processDraft = async () => {
    appModel.attrs['draftId:survey'] = '';
    await appModel.save();

    // eslint-disable-next-line no-param-reassign
    sample.metadata.saved = true;
    sample.save();
  };

  const onFinish = async () => {
    if (!sample.metadata.saved) {
      await _processDraft();
    }

    setShowThanks(true);
  };

  const goHome = () => navigate('/home/surveys', 'root');

  const uploadSurvey = async () => {
    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    const isValid = checkSampleStatus();
    if (!isValid) return;

    sample.upload().catch(toast.error);

    setPastActivity();

    try {
      await loader.show('Please wait...');

      syncActivities();
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();

    goHome();
  };

  const isValueValid = () => !!sample.attrs['weather-wind'];

  useEffect(() => {
    const updateActivities = async () => {
      const isActivitiesSynced = activities !== null;
      if (isActivitiesSynced) return;

      try {
        await loader.show('Please wait...');

        syncActivities();
      } catch (err: any) {
        console.log(err);
      }

      loader.hide();
    };

    updateActivities();
  }, []);

  const refreshReport = async () => {
    if (!device.isOnline) {
      toast.warn("Sorry, looks like you're offline.");
      return;
    }

    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    try {
      await loader.show('Please wait...');

      await syncActivities();
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();
  };

  const onListRefreshPull = (e: any) => {
    refreshReport();
    e?.detail?.complete(); // refresh pull update
  };

  const onChange = (e: any) => {
    const projects = appModel.attrs.activities || [];

    const activity = projects.find(
      (activityObj: ActivityProp) => activityObj.name === e.detail.value
    );

    // eslint-disable-next-line no-param-reassign
    sample.attrs.activity = activity;
    sample.save();
  };

  const byPastActivities = (activity: any) =>
    appModel.attrs.pastActivities.includes(activity.id);

  const byNonFavorite = (activity: any) =>
    !appModel.attrs.pastActivities.includes(activity.id);

  const activitiesList = appModel.attrs.activities || [];
  const favoriteActivities = activitiesList.filter(byPastActivities);
  const remainingActivities = activitiesList.filter(byNonFavorite);

  const getActivityEntries = (
    activitiesData: ActivityProp[],
    isPastActivity: boolean
  ) => {
    const alphabetically = (activityA: ActivityProp, activityB: ActivityProp) =>
      activityA.name.localeCompare(activityB.name);

    return activitiesData.sort(alphabetically).map((activity: ActivityProp) => {
      const { name = '', id, websiteUrl } = activity;

      const navigateTo = () => {
        window.location.href = websiteUrl;
      };

      const unpinFromPastActivityList = () => {
        const index = appModel.attrs.pastActivities.indexOf(id);
        appModel.attrs.pastActivities.splice(index, 1);
        appModel.save();
      };

      return (
        <IonItemSliding>
          {websiteUrl && (
            <IonItemOptions side="start">
              <IonItemOption color="tertiary" onClick={navigateTo}>
                <IonIcon icon={openOutline} />
              </IonItemOption>
            </IonItemOptions>
          )}
          <IonItem
            key={`${name} + ${id}`}
            className="radio-input-default-option"
          >
            <IonLabel>{name}</IonLabel>
            <IonRadio value={name} />
          </IonItem>

          {isPastActivity && (
            <IonItemOptions side="end">
              <IonItemOption color="medium" onClick={unpinFromPastActivityList}>
                <IonIcon icon={unPinIcon} />
              </IonItemOption>
            </IonItemOptions>
          )}
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
          {!!favoriteActivities.length && (
            <>
              <IonItemDivider mode="ios" className="survey-divider">
                <div>
                  <T>My past projects</T>
                </div>
              </IonItemDivider>

              {getActivityEntries(favoriteActivities, true)}
            </>
          )}

          <IonItemDivider mode="ios" className="survey-divider">
            <div>
              <T>Projects list</T>
            </div>
          </IonItemDivider>
          {getActivityEntries(remainingActivities, false)}
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
          <T>Is this survey part of a project?</T>
          <InfoButton label="Information" header="Info" skipTranslation>
            <p>
              <T>To refresh the projects list, pull the page down.</T>
            </p>

            <p>
              <T>
                To see more information about a project, please swipe the
                project to the right and tap on the link.
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

      {showThanks && (
        <ThankYouAlert
          sample={sample}
          uploadSurvey={uploadSurvey}
          goHome={goHome}
        />
      )}

      {isValueValid() && <Footer title="Save my count" onClick={onFinish} />}
    </Page>
  );
};

export default observer(ActivityController);
