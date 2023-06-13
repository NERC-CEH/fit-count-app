import ReactDOM from 'react-dom';
import { setupIonicReact, isPlatform } from '@ionic/react';
import appModel from 'models/app';
import userModel from 'models/user';
import savedSamples from 'models/savedSamples';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as AppPlugin } from '@capacitor/app';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import config from 'common/config';
import { configure as mobxConfig } from 'mobx';
import languages from 'common/languages';
import getLangCodeFromDevice from 'helpers/getLangCodeFromDevice';
import { initAnalytics } from '@flumens';
import App from './App';
import 'common/translations/translator';
import '@capacitor/core';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import 'common/theme.scss';

console.log('🚩 App starting.'); // eslint-disable-line

i18n.use(initReactI18next).init({
  lng: config.DEFAULT_LANGUAGE,
});

mobxConfig({
  enforceActions: 'never',
});

setupIonicReact({
  swipeBackEnabled: false,
});

async function init() {
  await appModel.ready;
  await userModel.ready;
  await savedSamples.ready;

  if (!appModel.attrs.language) {
    const langCode =
      (await getLangCodeFromDevice(Object.entries(languages))) ||
      config.DEFAULT_LANGUAGE;

    appModel.attrs.language = langCode;
    appModel.save();
  }

  appModel.attrs.sendAnalytics &&
    initAnalytics({
      dsn: config.sentryDNS,
      environment: config.environment,
      build: config.build,
      release: config.version,
      userId: userModel.id,
      tags: {
        'app.appSession': appModel.attrs.appSession,
      },
    });

  appModel.attrs.appSession += 1;
  appModel.save();

  ReactDOM.render(<App />, document.getElementById('root'));

  if (isPlatform('hybrid')) {
    StatusBar.setStyle({
      style: StatusBarStyle.Dark,
    });

    SplashScreen.hide();

    AppPlugin.addListener('backButton', () => {
      /* disable android app exit using back button */
    });
  }
}

init();
