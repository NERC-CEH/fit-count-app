import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import Countdown, { zeroPad } from 'react-countdown-now';
import { IonLabel } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import clsx from 'clsx';

function CountdownRenderer({ minutes, seconds, completed }) {
  const showMinutesAndSeconds = `${zeroPad(minutes)}:${zeroPad(seconds)}`;
  const remainingTimeIsLessThan3minutes = minutes < 3;

  if (completed) {
    return <T>Time's up!</T>;
  }

  return (
    <span className={clsx(remainingTimeIsLessThan3minutes && 'warn')}>
      {showMinutesAndSeconds}
    </span>
  );
}

CountdownRenderer.propTypes = exact({
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
});

function CountdownClock({ isPaused, countdown, onComplete }) {
  return (
    <IonLabel id="countdown" slot="end">
      {isPaused ? (
        <span className="paused">
          <T>Paused</T>
        </span>
      ) : (
        <Countdown
          date={countdown}
          renderer={CountdownRenderer}
          onComplete={onComplete}
        />
      )}
    </IonLabel>
  );
}

CountdownClock.propTypes = exact({
  onComplete: PropTypes.func.isRequired,
  isPaused: PropTypes.bool,
  countdown: PropTypes.number,
});

export default CountdownClock;
