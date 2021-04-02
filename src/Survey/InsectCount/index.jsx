import React, { useState } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page } from '@apps';
import { observer } from 'mobx-react';
import { IonItem, isPlatform } from '@ionic/react';
import { pauseOutline, playOutline } from 'ionicons/icons';
import Header from 'Survey/Components/Header';
import Footer from 'Survey/Components/Footer';
import surveyConfig from 'Survey/config';
import CountdownClock from 'Survey/Components/CountdownClock';
import { Plugins, HapticsImpactStyle } from '@capacitor/core';
import IntroAlert from './Components/IntroAlert';
import Main from './Main';
import './styles.scss';

const { Haptics } = Plugins;

const PAGE_INDEX = 7;

const NEXT_PAGE = 'weather-sky';

function toggleTimer(sample) {
  if (sample.metadata.pausedStartTime) {
    const pausedTime =
      Date.now() - new Date(sample.metadata.pausedStartTime).getTime();
    sample.metadata.pausedTotalTime += pausedTime; // eslint-disable-line
    sample.metadata.pausedStartTime = null; // eslint-disable-line
    sample.save();

    return;
  }

  sample.metadata.pausedStartTime = new Date(); // eslint-disable-line
}

function InsectCount({ sample }) {
  const hasCountStarted = !!sample.attrs.surveyStartTime;

  const [hasCountdownTimedOut, setCountdownTimedOut] = useState(
    sample.hasCountdownTimedOut()
  );

  function onSelect(species) {
    const bySpeciesId = occ => occ.attrs.taxon.id === species.id;
    const occurrence = sample.occurrences.find(bySpeciesId);

    if (!occurrence) {
      throw new Error('An occurrence for species is missing.', species);
    }

    if (sample.isDisabled()) {
      return;
    }

    isPlatform('hybrid') && Haptics.impact({ style: HapticsImpactStyle.Light });

    occurrence.attrs.count += 1;
    occurrence.save();
  }

  function onDecreaseCount(e, species) {
    const bySpeciesId = occ => occ.attrs.taxon.id === species.id;
    const occurrence = sample.occurrences.find(bySpeciesId);

    e.preventDefault();
    e.stopPropagation();

    if (occurrence.attrs.count <= 0) {
      return;
    }

    occurrence.attrs.count -= 1;
    occurrence.save();
  }

  const getCountDownClock = () => {
    const startTime = new Date(sample.attrs.surveyStartTime).getTime();

    const countdown =
      startTime +
      surveyConfig.DEFAULT_SURVEY_TIME +
      sample.metadata.pausedTotalTime;

    const isPaused = !!sample.metadata.pausedStartTime;

    const toggleTimerWrap = () => toggleTimer(sample);

    const setCountdownTimedOutWrap = () => {
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

  const setSurveyStartTime = () => {
    sample.attrs.surveyStartTime = new Date(); // eslint-disable-line
    sample.save();
  };

  const clock = getCountDownClock();

  return (
    <Page id="survey-insect-count-page">
      <Header
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Patch"
        rightSlot={clock}
      />

      <Main
        onSelect={onSelect}
        onDecreaseCount={onDecreaseCount}
        sample={sample}
      />

      {hasCountdownTimedOut && <Footer isEnabled link={NEXT_PAGE} />}

      {!hasCountStarted && <IntroAlert onContinue={setSurveyStartTime} />}
    </Page>
  );
}

InsectCount.propTypes = exact({
  sample: PropTypes.object.isRequired,
  match: PropTypes.object, // eslint-disable-line
  location: PropTypes.object, // eslint-disable-line
  history: PropTypes.object, // eslint-disable-line
});

export default observer(InsectCount);
