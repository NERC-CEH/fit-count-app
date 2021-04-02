import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import userModel from 'models/user';
import appModel from 'models/app';
import savedSamples from 'models/savedSamples';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonTabBar,
  IonRouterOutlet,
} from '@ionic/react';
import {
  homeOutline,
  informationCircleOutline,
  menuOutline,
  layersOutline,
} from 'ionicons/icons';
import PendingSurveysBadge from 'common/Components/PendingSurveysBadge';
import flyIcon from 'common/images/fly.svg';
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

const GuideWrap = () => <Guide appModel={appModel} />;

const HomeComponent = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home/info" />
          <Route path="/home/info" component={Home} exact />
          <Route path="/home/surveys" component={UserSurveys} exact />
          <Route path="/home/manual" component={Manual} exact />
          <Route path="/home/guide" render={GuideWrap} exact />
          <Route path="/home/menu" render={MenuWrap} exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className="home-tab-bar">
          <IonTabButton tab="home/info " href="/home/info">
            <IonIcon icon={homeOutline} />
          </IonTabButton>

          <IonTabButton tab="home/manual" href="/home/manual">
            <IonIcon icon={informationCircleOutline} />
          </IonTabButton>

          <IonTabButton tab="home/guide " href="/home/guide">
            <IonIcon icon={flyIcon} />
          </IonTabButton>

          <IonTabButton tab="/home/surveys" href="/home/surveys">
            <IonIcon icon={layersOutline} />

            <PendingSurveysBadge savedSamples={savedSamples} />
          </IonTabButton>

          <IonTabButton tab="home/menu " href="/home/menu">
            <IonIcon icon={menuOutline} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default HomeComponent;
