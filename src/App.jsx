import React from 'react';
import appModel from 'models/app';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { observer } from 'mobx-react';
import LanguageSelectRequired from 'common/Components/LanguageSelectRequire';
import OnBoardingScreens from './Info/onBoardingScreens';
import Home from './Home';
import Info from './Info/router';
import Settings from './Settings/router';

const HomeRedirect = () => {
  return <Redirect to="home" />;
};

const App = () => (
  <IonApp>
    <LanguageSelectRequired>
      <OnBoardingScreens appModel={appModel}>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route exact path="/" component={HomeRedirect} />
            <Route path="/home" component={Home} />
            {Info}
            {Settings}
          </IonRouterOutlet>
        </IonReactRouter>
      </OnBoardingScreens>
    </LanguageSelectRequired>
  </IonApp>
);

export default observer(App);
