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

  sentryDSN: process.env.APP_SENTRY_KEY as string,

  furtherInfoLink: {
    default: 'http://ukpoms.org.uk/fit-counts',
    IE: 'https://biodiversityireland.ie/surveys/fit-counts',
    DE: 'https://www.ufz.de/spring-pollination/index.php?de=49254',
    PT: 'https://www.pollinet.pt/fitcount',
  },

  feedbackLink: {
    default: 'https://fitcount.ceh.ac.uk/contact',
    CY: 'https://www.ris-ky.info/poms-ky',
    PT: 'https://www.pollinet.pt/fitcount',
  },

  feedbackEmail: {
    default: 'poms%40ceh.ac.uk',
    CY: 'pomscyprus%40gmail.com',
    PT: 'polinizacao%40pollinet.pt',
  },

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
