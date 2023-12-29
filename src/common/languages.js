import { isPlatform } from '@ionic/react';

const languages = {
  en: 'English',
  cy: 'Cymraeg',
  el: 'Eλληνικά',
  pt: { default: 'pt-BR' },
  'pt-BR': 'Português (Brasil)',
  'pt-PT': 'Português (Portugal)',
  de: 'Deutsch',
  es: { default: 'es-CL' },
  'es-CL': 'Español',
  hr: 'Hrvatski',
  se: 'Svenska',
};

const isDemo = !isPlatform('hybrid');
if (isDemo) {
  Object.assign(languages, {});
}

export default languages;
