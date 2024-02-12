import { FC } from 'react';
import { observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import CountriesSelectRequired from 'common/Components/CountriesSelectRequired';
import appModel from 'models/app';
import Home from './Home';
import OnBoardingScreens from './Info/OnBoardingScreens';
import Info from './Info/router';
import Settings from './Settings/router';
import Survey from './Survey/router';
import User from './User/router';

const HomeRedirect = () => {
  return <Redirect to="home" />;
};

const App: FC = () => (
  <IonApp>
    <CountriesSelectRequired>
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
    </CountriesSelectRequired>
  </IonApp>
);

export default observer(App);
