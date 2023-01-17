import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  cy: 'Cymraeg',
  el: 'Eλληνικά',
  pt: 'Português',
  de: 'Deutsch',
  es: 'Español',
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    se: 'Svenska',
  });

  Object.assign(languages, {
    hr: 'Hrvatski',
  });
}

export default languages;
