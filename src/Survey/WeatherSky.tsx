import { useContext, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import { Page, Attr, Main, InfoMessage } from '@flumens';
import { IonIcon, NavContext } from '@ionic/react';
import Footer from './Components/Footer';
import Header from './Components/Header';

// constant for page index
const PAGE_INDEX = 8;

// constant for next page
const NEXT_PAGE = 'weather-shade';

// props type for WeatherSky
export type Props = {
  sample: any;
};

// functional component for WeatherSky
const WeatherSky = observer((props: Props) => {
  // get navigation context
  const navContext = useContext(NavContext);

  // destructure sample from props
  const { sample } = props;

  // handle value change for weather sky
  const onValueChange = useCallback(
    (value: any): void => {
      // update weather-sky in sample data
      sample.data['weather-sky'] = value;
      sample.save();

      // navigate to next page after short delay
      const navigateToNextPage = () =>
        navContext.navigate(NEXT_PAGE, undefined, undefined, undefined, {
          unmount: true,
        });

      setTimeout(navigateToNextPage, 50);
    },
    [navContext, sample]
  );

  // check if value is valid
  const isValueValid = useCallback((): boolean => {
    // check if weather-sky value exists
    return !!sample.data['weather-sky'];
  }, [sample]);

  // get survey config and attribute props
  const attrProps = useMemo(() => {
    const surveyConfig = sample.getSurvey();
    return surveyConfig.attrs['weather-sky'].pageProps.attrProps;
  }, [sample]);

  // render component
  return (
    <Page id="survey-weather-sky-page">
      <Header
        sample={sample}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Insect"
      />

      <Main>
        <InfoMessage
          prefix={<IonIcon src={informationCircleOutline} className="size-6" />}
          color="tertiary"
          className="mb-3"
        >
          What is the <b>sky</b> above your location?
        </InfoMessage>

        <Attr
          attr="weather-sky"
          model={sample}
          {...attrProps}
          onChange={onValueChange}
        />
      </Main>

      {isValueValid() && <Footer link={NEXT_PAGE} />}
    </Page>
  );
});

export default WeatherSky;
