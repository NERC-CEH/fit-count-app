import React from 'react';
import ReactDOM from 'react-dom';
import { setupConfig, isPlatform } from '@ionic/react';
import appModel from 'models/app';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import i18n from 'i18next';
import config from 'common/config';
import { initAnalytics } from '@apps';
import { initReactI18next } from 'react-i18next';
import { configure as mobxConfigure } from 'mobx';
import languages from 'common/languages';
import getLangCodeFromDevice from 'common/Components/getLangCodeFromDevice';
import 'common/translations/translator';
import App from './App';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import 'common/theme.scss';

const { App: AppPlugin, StatusBar, SplashScreen } = Plugins;

i18n.use(initReactI18next).init({
  lng: config.DEFAULT_LANGUAGE,
});

mobxConfigure({
  enforceActions: 'never',
});

setupConfig({
  hardwareBackButton: false, // android back button
  swipeBackEnabled: false,
});

async function init() {
  await appModel._init;

  if (!appModel.attrs.language) {
    const langCode =
      (await getLangCodeFromDevice(Object.keys(languages))) ||
      config.DEFAULT_LANGUAGE;

    appModel.attrs.language = langCode;
    appModel.save();
  }

  initAnalytics({
    dsn: config.sentryDNS,
    environment: config.environment,
    build: config.build,
    release: config.version,
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
