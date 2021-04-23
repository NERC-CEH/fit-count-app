import { isPlatform } from '@ionic/react';

const demoOnly = !isPlatform('hybrid');

export default {
  en: 'English',
  // es: 'Español',
  el: demoOnly && 'Eλληνικά',
  // pt: 'Português',
  cy: 'Cymraeg',
};
