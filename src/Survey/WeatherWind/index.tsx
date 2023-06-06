import { FC } from 'react';
import { observer } from 'mobx-react';
import { Page, Attr, Main, InfoMessage } from '@flumens';
import Sample from 'models/sample';
import { informationCircleOutline } from 'ionicons/icons';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './styles.scss';

const PAGE_INDEX = 10;

const NEXT_PAGE = 'activities';

type Props = {
  sample: Sample;
};

const WeatherWind: FC<Props> = ({ sample }) => {
  const isValueValid = () => !!sample.attrs['weather-wind'];

  const surveyConfig = sample.getSurvey();
  const { attrProps } = surveyConfig.attrs['weather-wind'].pageProps;

  return (
    <Page id="survey-weather-wind-page">
      <Header
        sample={sample}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Shade"
      />

      <Main>
        <InfoMessage icon={informationCircleOutline}>
          What was the <b>wind</b> strength?
        </InfoMessage>

        <Attr attr="weather-wind" model={sample} {...attrProps} />
      </Main>

      {isValueValid() && <Footer link={NEXT_PAGE} />}
    </Page>
  );
};

export default observer(WeatherWind);
