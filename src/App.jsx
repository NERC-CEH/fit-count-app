import React from 'react';
import appModel from 'models/app';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { observer } from 'mobx-react';
import CountriesSelectRequire from 'common/Components/CountriesSelectRequire';
import OnBoardingScreens from './Info/OnBoardingScreens';
import Home from './Home';
import Info from './Info/router';
import Settings from './Settings/router';
import User from './User/router';
import Survey from './Survey/router';

const HomeRedirect = () => {
  return <Redirect to="home" />;
};

const App = () => (
  <IonApp>
    <CountriesSelectRequire>
      <OnBoardingScreens appModel={appModel}>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route exact path="/" component={HomeRedirect} />
            <Route path="/home" component={Home} />
            {User}
            {Info}
            {Survey}
            {Settings}
          </IonRouterOutlet>
        </IonReactRouter>
      </OnBoardingScreens>
    </CountriesSelectRequire>
  </IonApp>
);

export default observer(App);
