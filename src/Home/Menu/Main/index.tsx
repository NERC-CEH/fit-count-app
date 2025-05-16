import { observer } from 'mobx-react';
import {
  openOutline,
  lockClosedOutline,
  heartOutline,
  personAddOutline,
  personOutline,
  exitOutline,
  informationCircleOutline,
  settingsOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Main, InfoMessage } from '@flumens';
import { IonIcon, IonItem, IonList, IonButton } from '@ionic/react';
import getURLSpecificToLanguage from 'common/Components/getURLSpecificToLanguage';
import config from 'common/config';
import flumensLogo from 'common/images/flumens.svg';
import './styles.scss';

type Props = {
  isLoggedIn: boolean;
  isVerified: boolean;
  email: string;
  userName: string;
  logOut: any;
  refreshAccount: any;
  resendVerificationEmail: any;
};

const MenuComponent = ({
  isLoggedIn,
  isVerified,
  resendVerificationEmail,
  refreshAccount,
  email,
  userName,
  logOut,
}: Props) => {
  return (
    <Main className="app-menu">
      <h1>
        <T>Menu</T>
      </h1>

      <IonList lines="full">
        <h3 className="list-title">
          <T>User</T>
        </h3>
        <div className="rounded-list">
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
              Looks like your <b>{{ email } as any}</b> email hasn't been
              verified yet.
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

        <h3 className="list-title">
          <T>Info</T>
        </h3>
        <div className="rounded-list">
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

        <h3 className="list-title">
          <T>Settings</T>
        </h3>
        <div className="rounded-list">
          <IonItem routerLink="/settings/menu" detail>
            <IonIcon icon={settingsOutline} size="small" slot="start" />
            <T>App</T>
          </IonItem>
        </div>

        <div className="my-5 py-4">
          <a href="https://flumens.io">
            <img
              src={flumensLogo}
              alt="flumens-logo"
              className="mx-auto w-[30%]"
            />
          </a>

          <p className="mt-0 text-center opacity-70">
            <T>App version</T>: {`v${config.version} (${config.build})`}
          </p>
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MenuComponent);
