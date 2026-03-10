import type { CSSProperties } from 'react';
import { Trans as T } from 'react-i18next';
import { Page, Main } from '@flumens';
import { IonItem, IonLabel } from '@ionic/react';
import InfoBackgroundMessage from 'common/Components/InfoBackgroundMessage';
import getURLSpecificToLanguage from 'common/Components/getURLSpecificToLanguage';
import appLogo from 'common/images/appLogo.png';
import homePageBackground from './homePageBackground.jpg';
import './styles.scss';

// hide the terms updated message after this date
const TERMS_MESSAGE_EXPIRY = new Date('2027-06-01');
const showTermsMessage = new Date() < TERMS_MESSAGE_EXPIRY;

// style for background image
const style: CSSProperties = {
  backgroundImage: `url(${homePageBackground})`,
};

const Home = () => (
  <Page id="home-info">
    <Main forceOverscroll={false} scrollY={false}>
      <div className="app-home-background" style={style}>
        <div className="app-logo-wrapper">
          <img className="app-logo" src={appLogo} alt="appLogo" />
        </div>

        <div className="absolute bottom-1/6 w-full max-w-3/4 ml-[50%] -translate-x-1/2">
          {showTermsMessage && (
            <InfoBackgroundMessage
              name="showTermsUpdatedMessage"
              className="mb-6 max-w-none w-full text-center"
            >
              We’ve updated our{' '}
              <a href={getURLSpecificToLanguage('terms')}>Terms of Use</a> and{' '}
              <a href={getURLSpecificToLanguage('privacy-notice')}>
                Privacy Notice
              </a>
              . Please take a moment to review them before continuing.
            </InfoBackgroundMessage>
          )}

          <IonItem
            className="pretty-button w-full"
            detail
            routerLink="/survey/new"
            routerDirection="none"
          >
            <IonLabel>
              <T>Start Survey</T>
            </IonLabel>
          </IonItem>
        </div>
      </div>
    </Main>
  </Page>
);

export default Home;
