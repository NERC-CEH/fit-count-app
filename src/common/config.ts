import { Filesystem, Directory } from '@capacitor/filesystem';
import { isPlatform } from '@ionic/react';

const backendUrl = process.env.APP_BACKEND_URL || 'https://fitcount.ceh.ac.uk';

const indiciaUrl =
  process.env.APP_BACKEND_INDICIA_URL || 'https://warehouse1.indicia.org.uk';

const config = {
  environment: process.env.NODE_ENV as string,
  version: process.env.APP_VERSION as string,
  build: process.env.APP_BUILD as string,

  DEFAULT_LANGUAGE: 'en',

  sentryDNS: process.env.APP_SENTRY_KEY as string,

  feedbackLink: 'https://fitcount.ceh.ac.uk/contact',
  feedbackLinkCY: 'https://www.ris-ky.info/poms-ky',

  feedbackEmail: 'poms%40ceh.ac.uk',
  feedbackEmailCY: 'pomscyprus%40gmail.com',

  map: {
    mapboxApiKey: process.env.APP_MAPBOX_MAP_KEY as string,
  },

  backend: {
    url: backendUrl,
    clientId: process.env.APP_BACKEND_CLIENT_ID as string,
    clientPass: process.env.APP_BACKEND_CLIENT_PASS as string,

    mediaUrl: `${indiciaUrl}/upload/`,

    indicia: {
      url: indiciaUrl,
    },
  },

  dataPath: '',
};

(async function getMediaDirectory() {
  if (isPlatform('hybrid')) {
    const { uri } = await Filesystem.getUri({
      path: '',
      directory: Directory.Data,
    });
    config.dataPath = uri;
  }
})();

export default config;
