import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Main } from '@apps';
import { observer } from 'mobx-react';
import {
  IonSlides,
  IonSlide,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonFooter,
} from '@ionic/react';
import Log from 'helpers/log';
import { arrowForward, closeOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import appLogo from 'common/images/appLogo.png';
import first from './images/first.jpg';
import './styles.scss';

const SplashScreen = ({ appModel }) => {
  const [showSkip, setShowSkip] = useState(true);

  function exit() {
    Log('Info:Welcome:Controller: exit.');
    // eslint-disable-next-line no-param-reassign
    appModel.attrs.showedWelcome = true;
    appModel.save();
  }
  const slideRef = useRef(null);

  const handleSlideChangeStart = async () => {
    const isEnd = await slideRef.current.isEnd();
    setShowSkip(!isEnd);
  };

  const onIonSlidesDidLoadWrap = e => {
    // TODO: remove once bug is fixed
    // https://github.com/ionic-team/ionic/issues/19641
    // https://github.com/ionic-team/ionic/issues/19638
    e.target.update();
  };

  const slideNext = () => slideRef.current.swiper.slideNext();

  return (
    <Page id="welcome-page">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && (
              <IonButton color="none" onClick={exit}>
                <IonIcon icon={closeOutline} color="dark" />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <Main>
        <IonSlides
          pager
          ref={slideRef}
          onIonSlideWillChange={handleSlideChangeStart}
          onIonSlidesDidLoad={onIonSlidesDidLoadWrap}
        >
          <IonSlide className="first">
            <div
              className="slide-header"
              style={{ backgroundImage: `url(${first})` }}
            >
              <div className="app-logo-wrapper">
                <img className="app-logo" src={appLogo} alt="appLogo" />
              </div>

              <div className="message-blur-container">
                <div className="message">
                  <p>
                    <T>
                      Pollinators are important!
                      <br />
                      Help us monitor them with a Flower-Insect Timed Count
                    </T>
                  </p>
                </div>
              </div>
            </div>
          </IonSlide>

          <IonSlide className="second">
            <div className="slide-header">
              <div className="app-logo-wrapper-no-background">
                <img className="app-logo" src={appLogo} alt="appLogo" />
              </div>

              <div className="message">
                <T>
                  <ol>
                    <li>Wait for good weather! </li>
                    <li>Find a patch of target flowers</li>
                    <li>Count the flowers in your patch</li>
                    <li>
                      Count <b>all</b> insects that <b>land</b> on the{' '}
                      <b>target flowers</b>
                    </li>
                    <li>The app will tell you when your ten minutes is up</li>
                    <li>Save your count, and upload it to the website</li>
                  </ol>
                </T>

                <p className="message-text">
                  <T>
                    Read our ‘how-to’ guide, check out the insect ID guide, and
                    you’re ready to get started!
                  </T>
                </p>
              </div>

              <IonButton fill="clear" onClick={exit}>
                <T>Let's start the count!</T>
                <IonIcon slot="end" icon={arrowForward} />
              </IonButton>
            </div>
          </IonSlide>
        </IonSlides>
      </Main>

      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && (
              <IonButton color="none" onClick={slideNext}>
                <IonIcon icon={arrowForward} />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </Page>
  );
};

SplashScreen.propTypes = exact({
  appModel: PropTypes.object.isRequired,
});

const onBoardingScreens = ({ appModel, children }) => {
  const { showedWelcome } = appModel.attrs;

  if (!showedWelcome) {
    return <SplashScreen appModel={appModel} />;
  }

  return children;
};

onBoardingScreens.propTypes = exact({
  appModel: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
});

export default observer(onBoardingScreens);
