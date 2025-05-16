import type { ReactNode } from 'react';
import clsx from 'clsx';
import Countdown, { zeroPad } from 'react-countdown-now';
import { Trans as T } from 'react-i18next';
import { IonLabel } from '@ionic/react';

// props type for CountdownClock
export type CountdownClockProps = {
  onComplete: () => void;
  isPaused?: boolean;
  countdown?: number;
  hasStarted?: boolean;
};

// renderer for countdown display
const renderer = ({ minutes, seconds, completed }: any): ReactNode => {
  // show mm:ss format
  const showMinutesAndSeconds = `${zeroPad(minutes)}:${zeroPad(seconds)}`;

  // warn if less than 2 minutes left
  const remainingTimeIsLessThan2minutes = minutes < 2;

  // edge case: countdown completed
  if (completed) {
    return <T>Time's up!</T>;
  }

  return (
    <span className={clsx(remainingTimeIsLessThan2minutes && 'warn')}>
      {showMinutesAndSeconds}
    </span>
  );
};

// functional component for CountdownClock
const CountdownClock = ({
  isPaused,
  countdown,
  onComplete,
  hasStarted,
}: CountdownClockProps) => {
  // edge case: not started yet
  if (!hasStarted) {
    const minutes = new Date(countdown ?? 0).getMinutes();
    const seconds = new Date(countdown ?? 0).getSeconds();

    // show mm:ss format
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
};

export default CountdownClock;
