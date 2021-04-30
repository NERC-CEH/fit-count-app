import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  cy: 'Cymraeg',
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    // es: 'Español',
    el: 'Eλληνικά',
    // pt: 'Português',
  });
}

export default languages;
