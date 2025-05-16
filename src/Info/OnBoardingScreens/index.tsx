import { ReactNode, useState } from 'react';
import { observer } from 'mobx-react';
import { arrowForward, checkmarkOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Page, Main } from '@flumens';
import {
  IonButton,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonFooter,
} from '@ionic/react';
import appLogo from 'common/images/appLogo.png';
import appModel from 'models/app';
import first from './images/first.jpg';
import './styles.scss';

const SplashScreen = () => {
  const [moreSlidesExist, setMoreSlidesExist] = useState(true);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperCore>();

  function exit() {
    console.log('Info:Welcome:Controller: exit.');
    // eslint-disable-next-line no-param-reassign
    appModel.data.showedWelcome = true;
    appModel.save();
  }

  const handleSlideChangeStart = async () => {
    const isEnd = controlledSwiper && controlledSwiper.isEnd;
    setMoreSlidesExist(!isEnd);
  };

  const slideNextOrClose = () => {
    if (moreSlidesExist) {
      controlledSwiper && controlledSwiper.slideNext();
      return;
    }

    exit();
  };

  return (
    <Page id="welcome-page">
      <Main className="[--background:white]">
        <Swiper
          onSwiper={setControlledSwiper}
          modules={[Pagination]}
          pagination={moreSlidesExist}
          onSlideChange={handleSlideChangeStart}
        >
          <SwiperSlide className="first">
            <div
              className="slide-header"
              style={{ backgroundImage: `url(${first})` }}
            >
              <div className="app-logo-wrapper">
                <img className="app-logo" src={appLogo} alt="appLogo" />
              </div>
            </div>

            <div className="message-container">
              <div className="message">
                <p>
                  <T>
                    <b>Pollinators are important!</b>
                    <br />
                    Help us monitor them with a Flower-Insect Timed Count
                  </T>
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="second">
            <h1>
              <T>How To</T>
            </h1>

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

            <p className="read-more-text">
              <T>
                Read our full ‘how-to’ guide, check out insect ID pages, and
                you’re ready to get started!
              </T>
            </p>
          </SwiperSlide>
        </Swiper>
      </Main>

      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={slideNextOrClose}>
              <IonIcon
                icon={!moreSlidesExist ? checkmarkOutline : arrowForward}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </Page>
  );
};

interface OnBoardingScreensProps {
  children: ReactNode;
}

const onBoardingScreens: React.FC<OnBoardingScreensProps> = ({ children }) => {
  const { showedWelcome } = appModel.data;

  if (!showedWelcome) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};

export default observer(onBoardingScreens);
