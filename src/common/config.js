import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { isPlatform } from '@ionic/react';

const isProd = process.env.NODE_ENV === 'production';

const backendUrl = isProd
  ? 'https://fitcount.ceh.ac.uk'
  : 'https://dev-ceh-fitcount.pantheonsite.io';

const indiciaUrl = isProd
  ? 'https://warehouse1.indicia.org.uk'
  : 'https://devwarehouse.indicia.org.uk';

const isTestEnv = process.env.NODE_ENV === 'test';

const CONFIG = {
  environment: process.env.NODE_ENV,
  version: process.env.APP_VERSION,
  build: process.env.APP_BUILD,

  DEFAULT_LANGUAGE: 'en',

  log: !isTestEnv,

  sentryDNS: !isTestEnv && process.env.APP_SENTRY_KEY,

  feedbackEmail: 'poms%40ceh.ac.uk',

  map: {
    mapboxApiKey: process.env.APP_MAPBOX_MAP_KEY,
    mapboxOsmId: 'cehapps/ckghr3uxz01xb19udplq7wi6x',
    mapboxSatelliteId: 'cehapps/cipqvo0c0000jcknge1z28ejp',
  },

  backend: {
    url: backendUrl,
    clientId: process.env.APP_BACKEND_CLIENT_ID,
    clientPass: process.env.APP_BACKEND_CLIENT_PASS,

    mediaUrl: `${indiciaUrl}/upload/`,

    indicia: {
      url: indiciaUrl,
    },
  },
};

(async function getMediaDirectory() {
  if (isPlatform('hybrid')) {
    const { uri } = await Plugins.Filesystem.getUri({
      path: '',
      directory: FilesystemDirectory.Data,
    });
    CONFIG.dataPath = uri;
  }
})();

export default CONFIG;
