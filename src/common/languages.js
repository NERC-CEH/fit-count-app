import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  cy: 'Cymraeg',
  el: 'Eλληνικά',
  pt: 'Português',
  de: 'Deutsch',

};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    es: 'Español',
    se: 'Svenska',
  });
}

export default languages;
