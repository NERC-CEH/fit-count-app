import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { informationCircleOutline, openOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
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
import {
  IonItem,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonRadio,
  IonRadioGroup,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/react';
import appModel, { Activity } from 'models/app';
import Sample from 'models/sample';
import userModel, { useUserStatusCheck } from 'models/user';
import FinishFooter from 'Survey/Components/FinishFooter';
import Header from '../Components/Header';
import helpIcon from './images/helpIcon.jpg';
import './styles.scss';
import unPinIcon from './unpinIcon.svg';

const PAGE_INDEX = 11;

type Props = {
  sample: Sample;
};

const ActivityController = ({ sample }: Props) => {
  const toast = useToast();
  const loader = useLoader();
  const checkUserStatus = useUserStatusCheck();

  const fetchedActivities = Array.isArray(appModel.data.activities);
  const activities = fetchedActivities ? appModel.data.activities! : [];

  const setPastActivity = () => {
    const currentSelectedActivityId = sample.data.activity?.id;

    appModel.data.pastActivities.push(currentSelectedActivityId);

    const pastActivities = [...appModel.data.pastActivities];

    const uniqueActivities = new Set(pastActivities);

    const uniquePastActivitiesIds = [...uniqueActivities];

    appModel.data.pastActivities = uniquePastActivitiesIds;
    appModel.save();
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
    const newValue = e.detail.value;

    if (!newValue) {
      // eslint-disable-next-line no-param-reassign
      sample.data.activity = undefined;
      sample.save();
      return;
    }

    const selectedActivity = activities.find(
      (activity: Activity) => activity.id === newValue
    );

    // eslint-disable-next-line no-param-reassign
    sample.data.activity = JSON.parse(JSON.stringify(selectedActivity));
    sample.save();
  };

  const byPastActivities = (activity: any) =>
    appModel.data.pastActivities.includes(activity.id);

  const byNonFavorite = (activity: any) =>
    !appModel.data.pastActivities.includes(activity.id);

  const pastActivities = activities.filter(byPastActivities);
  const remainingActivities = activities.filter(byNonFavorite);

  const getActivityEntries = (
    activitiesData: Activity[],
    isPastActivity?: boolean
  ) => {
    const alphabetically = (activityA: Activity, activityB: Activity) =>
      activityA.name.localeCompare(activityB.name);

    const getActivityEntry = (activity: Activity) => {
      const { name = '', id, websiteUrl } = activity;

      const navigateTo = () => {
        window.location.href = websiteUrl!;
      };

      const unpinFromPastActivityList = () => {
        const index = appModel.data.pastActivities.indexOf(id);
        appModel.data.pastActivities.splice(index, 1);
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
          <IonItem>
            <IonRadio value={id}>{name}</IonRadio>
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
    };

    return activitiesData.sort(alphabetically).map(getActivityEntry);
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

    const defaultEmptySelection = (
      <IonItemSliding>
        <IonItem className="radio-input-default-option">
          <IonRadio value="">
            <T>Not linked to any project</T>
          </IonRadio>
        </IonItem>
      </IonItemSliding>
    );

    return (
      <IonList lines="full" className="radio-input-attr">
        <IonRadioGroup
          onIonChange={onChange}
          value={sample.data.activity?.id || ''}
        >
          {!!pastActivities.length && (
            <>
              <h3 className="list-title">
                <div>
                  <T>My past projects</T>
                </div>
              </h3>

              {getActivityEntries(pastActivities, true)}
            </>
          )}

          <h3 className="list-title">
            {!!pastActivities.length && (
              <div>
                <T>Projects</T>
              </div>
            )}
          </h3>

          {defaultEmptySelection}

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
          prefix={<IonIcon src={informationCircleOutline} className="size-6" />}
          color="tertiary"
          className="mb-3"
          skipTranslation
        >
          <T>
            If your count has been done as part of a project please select the
            project from the list below, otherwise select “Not linked to any
            project”.
          </T>
          <br />
          <br />
          <T>
            <i>
              Note that if you link your count to a project, your count results
              (including your name and the location of the count) will be made
              available to that project.
            </i>
          </T>
          <InfoButton
            label="Information"
            header="Info"
            skipTranslation
            color="tertiary"
          >
            <p>
              <T>
                To update the list of available projects, close this help text
                then swipe down on the project page to refresh the list of
                projects.
              </T>
            </p>
            <p>
              <T>
                If your count is being done as part of one of these projects,
                please tap to make the link.
              </T>
            </p>
            <p>
              <T>
                If your count is not part of a project just tap on “not linked
                to any project”.
              </T>
            </p>
            <p>
              <T>
                Your choice will be at the top of the list for any subsequent
                counts, but can be changed at any time.
              </T>
            </p>
            <p>
              <T>
                To see more information about each project, swipe the project
                name to the right and tap on the link (this will open a web page
                in your phone’s browser).
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

      <FinishFooter sample={sample} setPastActivity={setPastActivity} />
    </Page>
  );
};

export default observer(ActivityController);
