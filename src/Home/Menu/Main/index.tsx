import { FC } from 'react';
import { Main, MenuAttrToggle, MenuAttrItem, InfoMessage } from '@flumens';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import {
  IonIcon,
  IonItem,
  IonList,
  IonItemDivider,
  IonButton,
} from '@ionic/react';
import {
  openOutline,
  lockClosedOutline,
  shareSocialOutline,
  heartOutline,
  languageOutline,
  globeOutline,
  personAddOutline,
  personOutline,
  exitOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import config from 'common/config';
import languages from 'common/languages';
import countries from 'common/countries';
import flumensLogo from 'common/images/flumens.svg';
import getURLSpecificToLanguage from 'common/Components/getURLSpecificToLanguage';
import './styles.scss';

type Props = {
  onToggle: any;
  sendAnalytics: boolean;
  language: string;
  isLoggedIn: boolean;
  isVerified: boolean;
  email: string;
  userName: string;
  country: string;
  logOut: any;
  refreshAccount: any;
  resendVerificationEmail: any;
};

const MenuComponent: FC<Props> = ({
  onToggle,
  sendAnalytics,
  language,
  country,
  isLoggedIn,
  isVerified,
  resendVerificationEmail,
  refreshAccount,
  email,
  userName,
  logOut,
}) => {
  const onSendAnalyticsToggle = (checked: boolean) =>
    onToggle('sendAnalytics', checked);

  const countryName = ({ value }: any) => value === country;
  const selectedCountries: any = countries.find(countryName) || {};

  return (
    <Main className="app-menu">
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
              {userName}
            </IonItem>
          )}

          {isLoggedIn && !isVerified && (
            <InfoMessage className="verification-warning">
              Looks like your <b>{{ email }}</b> email hasn't been verified yet.
              <div>
                <IonButton fill="outline" onClick={refreshAccount}>
                  Refresh
                </IonButton>
                <IonButton fill="clear" onClick={resendVerificationEmail}>
                  Resend Email
                </IonButton>
              </div>
            </InfoMessage>
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
            value={(languages as any)[language]}
            label="Language"
            icon={languageOutline}
            routerOptions={{ unmount: true }} // Pick a new language on return
            skipValueTranslation
          />
          <MenuAttrItem
            routerLink="/settings/country"
            value={selectedCountries.label}
            label="Country"
            icon={globeOutline}
          />

          <MenuAttrToggle
            className="exception-rounded"
            icon={shareSocialOutline}
            label="Share App Analytics"
            value={sendAnalytics}
            onChange={onSendAnalyticsToggle}
          />

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
};

export default observer(MenuComponent);
