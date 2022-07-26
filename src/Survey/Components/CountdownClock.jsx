import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import Countdown, { zeroPad } from 'react-countdown-now';
import { IonLabel } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import clsx from 'clsx';

function CountdownClock({ isPaused, countdown, onComplete, hasStarted }) {
  function renderer({ minutes, seconds, completed }) {
    const showMinutesAndSeconds = `${zeroPad(minutes)}:${zeroPad(seconds)}`;
    const remainingTimeIsLessThan2minutes = minutes < 2;

    if (completed) {
      return <T>Time's up!</T>;
    }

    return (
      <span className={clsx(remainingTimeIsLessThan2minutes && 'warn')}>
        {showMinutesAndSeconds}
      </span>
    );
  }

  if (!hasStarted) {
    const minutes = new Date(countdown).getMinutes();
    const seconds = new Date(countdown).getSeconds();

    const showMinutesAndSeconds = `${zeroPad(minutes)}:${zeroPad(seconds)}`;

    return <span>{showMinutesAndSeconds}</span>;
  }

  return (
    <IonLabel id="countdown" slot="end">
      {isPaused ? (
        <span className="paused">
          <T>Paused</T>
        </span>
      ) : (
        <Countdown
          date={countdown}
          renderer={renderer}
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
  hasStarted: PropTypes.bool,
});

export default CountdownClock;
