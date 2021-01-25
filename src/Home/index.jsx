import React from 'react';
import { Route, Redirect } from 'react-router-dom';
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
  informationCircleOutline,
  menuOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import About from './About';
import Menu from './Menu';
import Guide from './Guide';
import './styles.scss';

const HomeComponent = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home/about" />
          <Route path="/home/about" component={About} exact />
          <Route path="/home/guide" component={Guide} exact />
          <Route path="/home/menu" component={Menu} exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className="home-tab-bar">
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
