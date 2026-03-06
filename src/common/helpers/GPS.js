import { Geolocation } from '@capacitor/geolocation';

const GPS_ACCURACY_LIMIT = 100; // meters

const API = {
  running: false,

  start(options = {}) {
    const { callback, onUpdate } = options;
    const accuracyLimit = options.accuracyLimit || GPS_ACCURACY_LIMIT;

    // geolocation config
    const GPSoptions = {
      enableHighAccuracy: true,
    };

    const onPosition = (position, err) => {
      if (err) {
        if (callback) callback(new Error(err.message));
        return;
      }

      const location = {
        latitude: position.coords.latitude.toFixed(8),
        longitude: position.coords.longitude.toFixed(8),
        accuracy: parseInt(position.coords.accuracy, 10),
        altitude: parseInt(position.coords.altitude, 10),
        altitudeAccuracy: parseInt(position.coords.altitudeAccuracy, 10),
      };

      if (location.accuracy <= accuracyLimit) {
        if (callback) callback(null, location);
        return;
      }

      if (onUpdate) onUpdate(location);
    };

    return Geolocation.watchPosition(GPSoptions, onPosition);
  },

  stop(id) {
    Geolocation.clearWatch({ id });
  },
};

export default API;
