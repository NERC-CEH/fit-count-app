import { Page, Main } from '@flumens';
import { IonItem, IonItemGroup, IonLabel, IonRouterLink } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import appLogo from 'common/images/appLogo.png';
import homePageBackground from './homePageBackground.jpg';
import './styles.scss';

const style = {
  backgroundImage: `url(${homePageBackground})`,
};

function Home() {
  return (
    <Page id="home-info">
      <Main forceOverscroll="false">
        <div className="app-home-background" style={style}>
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
