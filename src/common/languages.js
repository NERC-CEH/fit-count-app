import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  cy: 'Cymraeg',
  el: 'Eλληνικά',
  pt: { default: 'pt-BR' },
  'pt-BR': 'Português (Brasil)',
  de: 'Deutsch',
  es: { default: 'es-CL' },
  'es-CL': 'Español',
  hr: 'Hrvatski',
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {
    se: 'Svenska',
    'pt-PT': 'Português (Portugal)',
  });
}

export default languages;
