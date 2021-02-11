const backendUrl = process.env.APP_BACKEND_URL || 'https://TODO:';

const isTestEnv = process.env.NODE_ENV === 'test';

const CONFIG = {
  environment: process.env.NODE_ENV,
  version: process.env.APP_VERSION,
  build: process.env.APP_BUILD,

  DEFAULT_LANGUAGE: 'en',

  log: !isTestEnv,

  sentryDNS: !isTestEnv && process.env.APP_SENTRY_KEY,

  backend: {
    url: backendUrl,
    clientId: process.env.APP_BACKEND_CLIENT_ID,
    clientPass: process.env.APP_BACKEND_CLIENT_PASS,
  },

  map: {
    mapboxApiKey: process.env.APP_MAPBOX_MAP_KEY,
    mapboxOsmId: 'cehapps/ckghr3uxz01xb19udplq7wi6x',
    mapboxSatelliteId: 'cehapps/cipqvo0c0000jcknge1z28ejp',
  },
};

export default CONFIG;
