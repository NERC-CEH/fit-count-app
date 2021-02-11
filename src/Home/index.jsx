import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import userModel from 'models/user';
import savedSamples from 'models/savedSamples';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonRouterOutlet,
} from '@ionic/react';
import {
  bookOutline,
  homeOutline,
  informationCircleOutline,
  menuOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import Home from './Home';
import About from './About';
import Menu from './Menu';
import Guide from './Guide';
import './styles.scss';

const MenuWrap = () => (
  <Menu userModel={userModel} savedSamples={savedSamples} />
);

const HomeComponent = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home/info" />
          <Route path="/home/info" component={Home} exact />
          <Route path="/home/about" component={About} exact />
          <Route path="/home/guide" component={Guide} exact />
          <Route path="/home/menu" render={MenuWrap} exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className="home-tab-bar">
          <IonTabButton tab="home/info " href="/home/info">
            <IonIcon icon={homeOutline} />
            <IonLabel>
              <T>Home</T>
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/about " href="/home/about">
            <IonIcon icon={informationCircleOutline} />
            <IonLabel>
              <T>About</T>
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/guide " href="/home/guide">
            <IonIcon icon={bookOutline} />
            <IonLabel>
              <T>ID Guide</T>
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/menu " href="/home/menu">
            <IonIcon icon={menuOutline} />
            <IonLabel>
              <T>Menu</T>
            </IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default HomeComponent;
