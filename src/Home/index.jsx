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
  layersOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import PendingSurveysBadge from 'common/Components/PendingSurveysBadge';
import Home from './Home';
import Menu from './Menu';
import Guide from './Guide';
import Surveys from './UserSurveys';
import Manual from './Manual';
import './styles.scss';

const MenuWrap = () => (
  <Menu userModel={userModel} savedSamples={savedSamples} />
);

const UserSurveys = () => <Surveys savedSamples={savedSamples} />;

const HomeComponent = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home/info" />
          <Route path="/home/info" component={Home} exact />
          <Route path="/home/surveys" component={UserSurveys} exact />
          <Route path="/home/manual" component={Manual} exact />
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

          <IonTabButton tab="/home/surveys" href="/home/surveys">
            <IonIcon icon={layersOutline} />
            <IonLabel>
              <T>My Surveys</T>
            </IonLabel>
            <PendingSurveysBadge savedSamples={savedSamples} />
          </IonTabButton>

          <IonTabButton tab="home/guide " href="/home/guide">
            <IonIcon icon={bookOutline} />
            <IonLabel>
              <T>ID Guide</T>
            </IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/manual" href="/home/manual">
            <IonIcon icon={informationCircleOutline} />
            <IonLabel>
              <T>How To</T>
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
