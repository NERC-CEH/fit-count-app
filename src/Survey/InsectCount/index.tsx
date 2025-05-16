/* eslint-disable no-param-reassign */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { pauseOutline, playOutline } from 'ionicons/icons';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Page } from '@flumens';
import { IonItem, isPlatform } from '@ionic/react';
import Footer from 'Survey/Components/Footer';
import Header from 'Survey/Components/Header';
import surveyConfig from 'Survey/config';
import CountdownClock from './Components/CountdownClock';
import IntroAlert from './Components/IntroAlert';
import Main from './Main';
import './styles.scss';

// constant for page index
const PAGE_INDEX = 7;

// constant for next page
const NEXT_PAGE = 'weather-sky';

// props type for InsectCount
export type Props = {
  sample: any;
};

// toggle timer for survey
const toggleTimer = (sample: any): void => {
  // check if timer is paused
  if (sample.metadata.pausedStartTime) {
    // calculate paused time
    const pausedTime =
      Date.now() - new Date(sample.metadata.pausedStartTime).getTime();

    sample.metadata.pausedTotalTime += pausedTime;
    sample.metadata.pausedStartTime = null;
    sample.save();

    return;
  }

  sample.metadata.pausedStartTime = new Date();
};

// functional component for InsectCount
const InsectCount = observer((props: Props) => {
  // destructure sample from props
  const { sample } = props;

  // check if count has started
  const hasCountStarted = !!sample.data.surveyStartTime;

  // state for countdown timeout
  const [hasCountdownTimedOut, setCountdownTimedOut] = useState(
    sample.hasCountdownTimedOut()
  );

  // handle species selection
  const onSelect = (species: any): void => {
    // find occurrence by species id
    const bySpeciesId = (occ: any) => occ.data.taxon.id === species.id;
    const occurrence = sample.occurrences.find(bySpeciesId);

    // edge case: occurrence missing
    if (!occurrence) {
      throw new Error('An occurrence for species is missing.', species);
    }

    // check if sample is disabled
    if (sample.isDisabled) {
      return;
    }

    // trigger haptic feedback on hybrid
    if (isPlatform('hybrid')) {
      Haptics.impact({ style: ImpactStyle.Light });
    }

    occurrence.data.count += 1;
    occurrence.save();
  };

  // handle decrease count
  const onDecreaseCount = (e: React.MouseEvent, species: any): void => {
    // find occurrence by species id
    const bySpeciesId = (occ: any) => occ.data.taxon.id === species.id;
    const occurrence = sample.occurrences.find(bySpeciesId);

    e.preventDefault();
    e.stopPropagation();

    // edge case: count already zero
    if (occurrence.data.count <= 0) {
      return;
    }

    occurrence.data.count -= 1;
    occurrence.save();
  };

  // get countdown clock node
  const getCountDownClock = (): ReactNode => {
    // get survey start time
    const startTime = new Date(sample.data.surveyStartTime).getTime();

    // calculate countdown
    const countdown =
      startTime +
      surveyConfig.DEFAULT_SURVEY_TIME +
      sample.metadata.pausedTotalTime;

    // check if timer is paused
    const isPaused = !!sample.metadata.pausedStartTime;

    // wrap toggle timer
    const toggleTimerWrap = (): void => toggleTimer(sample);

    // wrap set countdown timed out
    const setCountdownTimedOutWrap = (): void => {
      setCountdownTimedOut(true);
    };

    return (
      <IonItem
        slot="end"
        detailIcon={!isPaused ? playOutline : pauseOutline}
        onClick={toggleTimerWrap}
        detail={!hasCountdownTimedOut}
      >
        <CountdownClock
          countdown={countdown}
          isPaused={isPaused}
          onComplete={setCountdownTimedOutWrap}
          hasStarted={hasCountStarted}
        />
      </IonItem>
    );
  };

  // set survey start time
  const setSurveyStartTime = (): void => {
    sample.data.surveyStartTime = new Date();
    sample.save();
  };

  // get clock node
  const clock = getCountDownClock();

  // render component
  return (
    <Page id="survey-insect-count-page">
      <Header
        sample={sample}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Patch"
        rightSlot={clock}
      />

      <Main
        onSelect={onSelect}
        onDecreaseCount={onDecreaseCount}
        sample={sample}
      />

      {hasCountdownTimedOut && <Footer link={NEXT_PAGE} />}

      {!hasCountStarted && <IntroAlert onContinue={setSurveyStartTime} />}
    </Page>
  );
});

export default InsectCount;
