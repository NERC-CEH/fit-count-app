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
import appModel, { Activity } from 'models/app';
import userModel, { useUserStatusCheck } from 'models/user';
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

  const fetchedActivities = Array.isArray(appModel.attrs.activities);
  const activities = fetchedActivities ? appModel.attrs.activities! : [];

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
    setPastActivity();

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

    goHome();
  };

  const fetchActivitiesForFirstTime = () => {
    if (fetchedActivities || !device.isOnline || !userModel.isLoggedIn())
      return;

    const updateActivities = async () => {
      try {
        await loader.show('Please wait...');
        await appModel.syncActivities();
      } catch (err: any) {
        // silent, log in the server only
        console.log(err);
      }

      loader.hide();
    };

    updateActivities();
  };
  useEffect(fetchActivitiesForFirstTime, []);

  const refreshActivities = async (e: any) => {
    e?.detail?.complete(); // refresh pull update

    if (!device.isOnline) {
      toast.warn("Sorry, looks like you're offline.");
      return;
    }

    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    try {
      await loader.show('Please wait...');
      await appModel.syncActivities();
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();
  };

  const onChange = (e: any) => {
    const selectedActivity = activities.find(
      (activity: Activity) => activity.id === e.detail.value
    );

    // eslint-disable-next-line no-param-reassign
    sample.attrs.activity = JSON.parse(JSON.stringify(selectedActivity));
    sample.save();
  };

  const byPastActivities = (activity: any) =>
    appModel.attrs.pastActivities.includes(activity.id);

  const byNonFavorite = (activity: any) =>
    !appModel.attrs.pastActivities.includes(activity.id);

  const favouriteActivities = activities.filter(byPastActivities);
  const remainingActivities = activities.filter(byNonFavorite);

  const getActivityEntries = (
    activitiesData: Activity[],
    isPastActivity: boolean
  ) => {
    const alphabetically = (activityA: Activity, activityB: Activity) =>
      activityA.name.localeCompare(activityB.name);

    return activitiesData.sort(alphabetically).map((activity: Activity) => {
      const { name = '', id, websiteUrl } = activity;

      const navigateTo = () => {
        window.location.href = websiteUrl!;
      };

      const unpinFromPastActivityList = () => {
        const index = appModel.attrs.pastActivities.indexOf(id);
        appModel.attrs.pastActivities.splice(index, 1);
        appModel.save();
      };

      return (
        <IonItemSliding key={`${name} + ${id}`}>
          {websiteUrl && (
            <IonItemOptions side="start">
              <IonItemOption color="tertiary" onClick={navigateTo}>
                <IonIcon icon={openOutline} />
              </IonItemOption>
            </IonItemOptions>
          )}
          <IonItem className="radio-input-default-option">
            <IonLabel>{name}</IonLabel>
            <IonRadio value={id} />
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
    if (!fetchedActivities) {
      return (
        <InfoBackgroundMessage>
          Pull the page down to refresh the list of projects.
        </InfoBackgroundMessage>
      );
    }

    if (fetchedActivities && !activities.length) {
      return (
        <InfoBackgroundMessage>
          Your selected country does not have any projects.
        </InfoBackgroundMessage>
      );
    }

    return (
      <IonList lines="full" className="radio-input-attr">
        <IonRadioGroup
          allowEmptySelection
          onIonChange={onChange}
          value={sample.attrs.activity?.id}
        >
          {!!favouriteActivities.length && (
            <>
              <IonItemDivider mode="ios" className="survey-divider">
                <div>
                  <T>My past projects</T>
                </div>
              </IonItemDivider>

              {getActivityEntries(favouriteActivities, true)}
            </>
          )}

          <IonItemDivider mode="ios" className="survey-divider">
            {!!favouriteActivities.length && (
              <div>
                <T>Projects</T>
              </div>
            )}
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
          <T>
            Is this survey part of a <b>project</b>?
          </T>
          <InfoButton label="Information" header="Info" skipTranslation>
            <p>
              <T>Pull the page down to refresh the list of projects.</T>
            </p>
            <p>
              <T>
                To see more information about a project, swipe the project entry
                to the right and tap on the link.
              </T>
            </p>

            <img src={helpIcon} className="helpIcon" />
          </InfoButton>
        </InfoMessage>

        <IonRefresher slot="fixed" onIonRefresh={refreshActivities}>
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

      <Footer title="Save my count" onClick={onFinish} />
    </Page>
  );
};

export default observer(ActivityController);
