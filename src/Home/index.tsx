import { useEffect, FC } from 'react';
import {
  homeOutline,
  informationCircleOutline,
  menuOutline,
  layersOutline,
} from 'ionicons/icons';
import { Route, Redirect } from 'react-router-dom';
import { App as AppPlugin } from '@capacitor/app';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonTabBar,
  IonRouterOutlet,
  useIonRouter,
} from '@ionic/react';
import PendingSurveysBadge from 'common/Components/PendingSurveysBadge';
import flyIcon from 'common/images/fly.svg';
import savedSamples from 'models/collections/samples';
import Guide from './Guide';
import Home from './Home';
import Manual from './Manual';
import Menu from './Menu';
import Surveys from './UserSurveys';
import './styles.scss';

// main home component
const HomeComponent: FC = () => {
  const ionRouter = useIonRouter();

  // handle app exit on back button
  const exitApp = () => {
    // handle exit if not able to go back
    const onExitApp = () => {
      if (!ionRouter.canGoBack()) {
        AppPlugin.exitApp();
      }
    };

    // register back button event
    const exit = (ev: any) => {
      ev.detail.register(-1, onExitApp);
    };

    document.addEventListener('ionBackButton', exit);

    // cleanup event listener on unmount
    const removeEventListener = () => {
      document.removeEventListener('ionBackButton', exit);
    };

    return removeEventListener;
  };

  // run exitApp effect on mount
  useEffect(exitApp, []);

  // render home tabs and routes
  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home/info" />
          <Route path="/home/info" component={Home} exact />
          <Route path="/home/surveys" component={Surveys} exact />
          <Route path="/home/manual" component={Manual} exact />
          <Route path="/home/guide" component={Guide} exact />
          <Route path="/home/menu" component={Menu} exact />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" className="home-tab-bar">
          <IonTabButton tab="home/info" href="/home/info">
            <IonIcon icon={homeOutline} />
          </IonTabButton>

          <IonTabButton tab="home/manual" href="/home/manual">
            <IonIcon icon={informationCircleOutline} />
          </IonTabButton>

          <IonTabButton tab="home/guide" href="/home/guide">
            <IonIcon icon={flyIcon} />
          </IonTabButton>

          <IonTabButton tab="/home/surveys" href="/home/surveys">
            <IonIcon icon={layersOutline} />
            <PendingSurveysBadge savedSamples={savedSamples} />
          </IonTabButton>

          <IonTabButton tab="home/menu" href="/home/menu">
            <IonIcon icon={menuOutline} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default HomeComponent;
