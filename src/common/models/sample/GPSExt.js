import { observable } from 'mobx';
import { updateModelLocation } from '@flumens';
import GPS from 'helpers/GPS';

const DEFAULT_ACCURACY_LIMIT = 50; // meters

const extension = {
  setLocation([longitude, latitude], source, accuracy) {
    this.data.location = {
      latitude,
      longitude,
      source: source || 'map',
      accuracy,
    };

    return this.save();
  },

  toggleGPStracking(state, accuracyLimit = DEFAULT_ACCURACY_LIMIT) {
    if (this.isGPSRunning() || state === false) {
      this.stopGPS();
      return;
    }

    this.startGPS(accuracyLimit);
  },

  gpsExtensionInit() {
    this.gps = observable({ locating: null });
  },

  async startGPS(accuracyLimit = DEFAULT_ACCURACY_LIMIT) {
    const that = this;
    const options = {
      accuracyLimit,

      callback(error, location) {
        if (error) {
          console.warn(error);

          that.stopGPS();
          return;
        }

        const isAccurateEnough = location.accuracy <= options.accuracyLimit;
        if (!isAccurateEnough) {
          return;
        }

        that.stopGPS();
        updateModelLocation(that, location);
      },
    };

    this.gps.locating = await GPS.start(options);
  },

  async stopGPS() {
    if (!this.gps.locating) {
      return;
    }

    await GPS.stop(this.gps.locating);
    this.gps.locating = null;
  },

  isGPSRunning() {
    return !!(this.gps.locating || this.gps.locating === 0);
  },
};

export default extension;
