import { FC } from 'react';
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
import {
  IonIcon,
  IonItem,
  IonList,
  IonItemDivider,
  IonButton,
} from '@ionic/react';
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

const MenuComponent: FC<Props> = ({
  isLoggedIn,
  isVerified,
  resendVerificationEmail,
  refreshAccount,
  email,
  userName,
  logOut,
}) => {
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
          <IonItem routerLink="/settings/menu" detail>
            <IonIcon icon={settingsOutline} size="small" slot="start" />
            <T>App</T>
          </IonItem>
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
