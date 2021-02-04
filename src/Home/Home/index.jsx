import React from 'react';
import { Page, Main } from '@apps';
import { IonItem, IonItemGroup, IonLabel, IonRouterLink } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import appLogo from './appLogo.png';
import './homePageBackground.jpg';
import './styles.scss';

function Home() {
  return (
    <Page id="home-info">
      <Main>
        <div className="app-home-background">
          <div className="app-logo-wrapper">
            <img className="app-logo" src={appLogo} alt="appLogo" />
          </div>

          <IonItemGroup>
            <IonRouterLink routerLink="/survey/new" routerDirection="none">
              <IonItem className="pretty-button" detail>
                <IonLabel>
                  <T>Start Survey</T>
                </IonLabel>
              </IonItem>
            </IonRouterLink>
          </IonItemGroup>
        </div>
      </Main>
    </Page>
  );
}

export default Home;
