/* eslint-disable no-param-reassign */
import { useCallback, useContext } from 'react';
import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import { Page, Attr, Main, InfoMessage } from '@flumens';
import { IonIcon, NavContext } from '@ionic/react';
import Sample from 'models/sample';
import FinishFooter from 'Survey/Components/FinishFooter';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import './styles.scss';

const PAGE_INDEX = 10;

const NEXT_PAGE = 'activities';

type Props = {
  sample: Sample;
};

const WeatherWind = ({ sample }: Props) => {
  const navContext = useContext(NavContext);

  const isValueValid = () => !!sample.data['weather-wind'];

  const surveyConfig = sample.getSurvey();
  const { attrProps } = surveyConfig.attrs['weather-wind'].pageProps;

  const useActivities = sample.shouldUseActivities();

  const onValueChange = useCallback(
    (value: string): void => {
      sample.data['weather-wind'] = value;
      sample.save();

      if (!useActivities) return;

      // navigate to next page after short delay
      const navigateToNextPage = () =>
        navContext.navigate(NEXT_PAGE, undefined, undefined, undefined, {
          unmount: true,
        });

      setTimeout(navigateToNextPage, 50);
    },
    [navContext, useActivities, sample]
  );

  let footer;
  if (useActivities) {
    footer = isValueValid() && <Footer link={NEXT_PAGE} />;
  } else {
    footer = <FinishFooter sample={sample} />;
  }

  return (
    <Page id="survey-weather-wind-page">
      <Header
        sample={sample}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Shade"
      />

      <Main>
        <InfoMessage
          prefix={<IonIcon src={informationCircleOutline} className="size-6" />}
          color="tertiary"
          className="mb-3"
        >
          What was the <b>wind</b> strength?
        </InfoMessage>

        <Attr
          attr="weather-wind"
          model={sample}
          {...attrProps}
          onChange={onValueChange}
        />
      </Main>

      {footer}
    </Page>
  );
};

export default observer(WeatherWind);
