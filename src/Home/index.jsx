import React, { useRef } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonRouterOutlet,
} from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import About from './About';
import './styles.scss';

const HomeComponent = () => {
  const tabsRef = useRef();

  return (
    <>
      <IonTabs ref={tabsRef}>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home/about" />
          <Route path="/home/about" component={About} exact />
        </IonRouterOutlet>

        <IonTabBar>
          <IonTabButton tab="home/about " href="/home/about">
            <IonIcon icon={informationCircleOutline} />
            <IonLabel>
              <T>About</T>
            </IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default HomeComponent;
