import React from 'react';
import appModel from 'models/app';
import config from 'common/config';
import { observer } from 'mobx-react';
import { Page } from '@apps';
import { Trans as T } from 'react-i18next';
import { IonFooter, IonTitle, IonHeader, IonToolbar } from '@ionic/react';
import flumensLogo from 'common/images/flumens.svg';
import Main from './Main';
import './styles.scss';

const onToggle = (setting, checked) => {
  appModel.attrs[setting] = checked; // eslint-disable-line
  appModel.save();
};

const MenuController = () => {
  const { sendAnalytics } = appModel.attrs;

  const onToggleWrap = (...args) => onToggle(...args);

  return (
    <Page id="home-menu">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <T>Menu</T>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <Main
        sendAnalytics={sendAnalytics}
        onToggle={onToggleWrap}
        config={config}
      />

      <IonFooter>
        <div>
          <a href="https://flumens.io">
            <img src={flumensLogo} alt="flumens-logo" />
          </a>

          <p className="app-version">{`App version: v${config.version} (${config.build})`}</p>
        </div>
      </IonFooter>
    </Page>
  );
};

export default observer(MenuController);
