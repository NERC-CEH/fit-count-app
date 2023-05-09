import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  cy: 'Cymraeg',
  el: 'Eλληνικά',
  pt: 'Português',
  de: 'Deutsch',
  es: 'Español',
  hr: 'Hrvatski',
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    se: 'Svenska',
  });
}

export default languages;
