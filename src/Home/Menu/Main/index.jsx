import React from 'react';
import PropTypes from 'prop-types';
import { Main, Toggle, MenuAttrItem, InfoMessage } from '@apps';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import exact from 'prop-types-exact';
import {
  IonIcon,
  IonItem,
  IonList,
  IonItemDivider,
  IonLabel,
} from '@ionic/react';
import {
  openOutline,
  lockClosedOutline,
  shareSocialOutline,
  heartOutline,
  languageOutline,
  // globeOutline,
  personAddOutline,
  personOutline,
  exitOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import languages from 'common/languages';
// import countries from 'common/countries';
import flumensLogo from 'common/images/flumens.svg';
import getURLSpecificToLanguage from 'common/Components/getURLSpecificToLanguage';

function MenuComponent({
  onToggle,
  sendAnalytics,
  config,
  language,
  // country,
  isLoggedIn,
  user,
  logOut,
}) {
  const onSendAnalyticsToggle = checked => onToggle('sendAnalytics', checked);

  // const countryName = ({ value }) => value === country;
  // const selectedCountries = countries.find(countryName) || {};

  return (
    <Main>
      <h1>
        <T>Menu</T>
      </h1>

      <IonList lines="full">
        <IonItemDivider>
          <T>User</T>
        </IonItemDivider>
        <div className="rounded">
          {isLoggedIn && (
            <IonItem detail id="logout-button" onClick={logOut}>
              <IonIcon icon={exitOutline} size="small" slot="start" />
              <T>Logout</T>
              {': '}
              {user.fullName}
            </IonItem>
          )}

          {!isLoggedIn && (
            <IonItem routerLink="/user/login" detail>
              <IonIcon icon={personOutline} size="small" slot="start" />
              <T>Login</T>
            </IonItem>
          )}

          {!isLoggedIn && (
            <IonItem routerLink="/user/register" detail>
              <IonIcon icon={personAddOutline} size="small" slot="start" />
              <T>Register</T>
            </IonItem>
          )}
        </div>

        <IonItemDivider>
          <T>Info</T>
        </IonItemDivider>
        <div className="rounded">
          <IonItem routerLink="/info/about" detail>
            <IonIcon
              icon={informationCircleOutline}
              size="small"
              slot="start"
            />
            <T>About</T>
          </IonItem>

          <IonItem routerLink="/info/credits" detail>
            <IonIcon icon={heartOutline} size="small" slot="start" />
            <T>Credits</T>
          </IonItem>

          <IonItem
            href={getURLSpecificToLanguage('privacy-notice')}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={lockClosedOutline} size="small" slot="start" />
            <T>Privacy Policy</T>
          </IonItem>

          <IonItem
            href={getURLSpecificToLanguage('terms')}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={lockClosedOutline} size="small" slot="start" />
            <T>Terms and Conditions</T>
          </IonItem>
        </div>

        <IonItemDivider>
          <T>Settings</T>
        </IonItemDivider>

        <div className="rounded">
          <MenuAttrItem
            routerLink="/settings/language"
            value={languages[language]}
            label="Language"
            icon={languageOutline}
            routerOptions={{ unmount: true }} // Pick a new language on return
            skipValueTranslation
          />

          {/* <MenuAttrItem
              routerLink="/settings/country"
              value={selectedCountries.label}
              label="Country"
              icon={globeOutline}
            /> */}

          <IonItem className="exception-rounded">
            <IonIcon icon={shareSocialOutline} size="small" slot="start" />
            <IonLabel>
              <T>Share App Analytics</T>
            </IonLabel>
            <Toggle onToggle={onSendAnalyticsToggle} checked={sendAnalytics} />
          </IonItem>

          <InfoMessage color="medium">
            Share app crash data so we can make the app more reliable.
          </InfoMessage>
        </div>

        <div className="flumens-section">
          <div>
            <a href="https://flumens.io">
              <img src={flumensLogo} alt="flumens-logo" />
            </a>

            <p className="app-version">
              <T>App version</T>: {`v${config.version} (${config.build})`}
            </p>
          </div>
        </div>
      </IonList>
    </Main>
  );
}

MenuComponent.propTypes = exact({
  onToggle: PropTypes.func.isRequired,
  sendAnalytics: PropTypes.bool.isRequired,
  config: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  // country: PropTypes.string.isRequired,
});

export default observer(MenuComponent);
