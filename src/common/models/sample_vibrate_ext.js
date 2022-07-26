/* eslint-disable @getify/proper-arrows/name */
import { Haptics } from '@capacitor/haptics';
import { isPlatform } from '@ionic/react';

const extension = {
  startVibrateCounter() {
    console.log('SampleModel:Vibrate: start.');

    this.counterId = setInterval(() => {
      const isTimeout = this.hasCountdownTimedOut();

      if (isTimeout && !this._timeoutVibrated) {
        isPlatform('hybrid') && !this.metadata.deleted && Haptics.vibrate();
        console.log('SampleModel:Vibrate: start.');
        this._timeoutVibrated = true;
        this.stopVibrateCounter();
      }

      const isBelow2mins = this.hasCountdown2MinutesLeft();
      if (isBelow2mins && !this._below2minsVibrated) {
        isPlatform('hybrid') && !this.metadata.deleted && Haptics.vibrate();
        console.log('SampleModel:Vibrate: stop.');

        this._below2minsVibrated = true;
      }
    }, 1000);
  },

  stopVibrateCounter() {
    if (this.counterId) {
      console.log('SampleModel:Vibrate: stop.');
      clearInterval(this.counterId);
    }
  },
};

export { extension as default };
