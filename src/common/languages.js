import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  cy: 'Cymraeg',
  el: 'Eλληνικά',
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    // es: 'Español',
    pt: 'Português',
    se: 'Svenska',
  });
}

export default languages;
