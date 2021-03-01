/* eslint-disable @getify/proper-arrows/name */
import Log from 'helpers/log';
import { Plugins } from '@capacitor/core';
import { isPlatform } from '@ionic/react';

const { Haptics } = Plugins;

const extension = {
  startVibrateCounter() {
    Log('SampleModel:Vibrate: start.');

    this.counterId = setInterval(() => {
      const isTimeout = this.hasCountdownTimedOut();

      if (isTimeout && !this._timeoutVibrated) {
        isPlatform('hybrid') && Haptics.vibrate();
        Log('SampleModel:Vibrate: start.');
        this._timeoutVibrated = true;
        this.stopVibrateCounter();
      }

      const isBelow2mins = this.hasCountdown2MinutesLeft();
      if (isBelow2mins && !this._below2minsVibrated) {
        isPlatform('hybrid') && Haptics.vibrate();
        Log('SampleModel:Vibrate: stop.');

        this._below2minsVibrated = true;
      }
    }, 1000);
  },

  stopVibrateCounter() {
    if (this.counterId) {
      Log('SampleModel:Vibrate: stop.');
      clearInterval(this.counterId);
    }
  },
};

export { extension as default };
