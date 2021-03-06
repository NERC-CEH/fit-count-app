import React from 'react';
import { Trans as T } from 'react-i18next';
import appModel from 'models/app';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import config from 'common/config';
import { observer } from 'mobx-react';
import { Page, alert } from '@apps';
import { IonItem, IonLabel, IonCheckbox } from '@ionic/react';
import Main from './Main';
import './styles.scss';

const onToggle = (setting, checked) => {
  appModel.attrs[setting] = checked; // eslint-disable-line
  appModel.save();
};

function showLogoutConfirmationDialog(callback) {
  let deleteData = true;

  const onCheckboxChange = e => {
    deleteData = e.detail.checked;
  };

  alert({
    header: 'Logout',
    message: (
      <>
        <T>Are you sure you want to logout?</T>
        <br />
        <br />
        <IonItem lines="none" className="log-out-checkbox">
          <IonLabel>
            <T>Discard local data</T>
          </IonLabel>
          <IonCheckbox checked onIonChange={onCheckboxChange} />
        </IonItem>
      </>
    ),
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Logout',
        cssClass: 'primary',
        handler: () => callback(deleteData),
      },
    ],
  });
}

const MenuController = ({ userModel, savedSamples }) => {
  const { sendAnalytics, language, country } = appModel.attrs;

  function logOut() {
    const onReset = async reset => {
      if (reset) {
        await savedSamples.resetDefaults();
      }

      appModel.save();
      userModel.logOut();
    };

    showLogoutConfirmationDialog(onReset);
  }

  const isLoggedIn = !!userModel.attrs.id;

  return (
    <Page id="home-menu">
      <Main
        sendAnalytics={sendAnalytics}
        onToggle={onToggle}
        config={config}
        language={language}
        country={country}
        isLoggedIn={isLoggedIn}
        user={userModel.attrs}
        logOut={logOut}
      />
    </Page>
  );
};

MenuController.propTypes = exact({
  userModel: PropTypes.object.isRequired,
  savedSamples: PropTypes.array.isRequired,
});

export default observer(MenuController);
