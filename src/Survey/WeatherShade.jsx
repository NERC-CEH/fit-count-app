import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Attr, Main, InfoMessage } from '@apps';
import { NavContext } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import Header from './Components/Header';
import Footer from './Components/Footer';

const PAGE_INDEX = 9;

const NEXT_PAGE = 'weather-wind';

class WeatherShade extends React.Component {
  static contextType = NavContext;

  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
  });

  onValueChange = value => {
    const { sample } = this.props;
    sample.attrs['weather-shade'] = value;
    sample.save();

    const navigateToNextPage = () => this.context.navigate(NEXT_PAGE);

    setTimeout(navigateToNextPage, 50);
  };

  isValueValid = () => !!this.props.sample.attrs['weather-shade'];

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();
    const attr = surveyConfig.attrs['weather-shade'];

    const value = sample.attrs['weather-shade'];

    return (
      <Page id="survey-weather-shade-page">
        <Header surveyProgressIndex={PAGE_INDEX} backButtonLabel="Sky" />

        <Main>
          <InfoMessage icon={informationCircleOutline}>
            How much <b>sun</b> fell on your patch during the FIT Count; was it:
          </InfoMessage>

          <Attr
            component={attr.type}
            componentProps={attr.componentProps}
            onChange={this.onValueChange}
            value={value}
          />
        </Main>

        {this.isValueValid() && <Footer link={NEXT_PAGE} />}
      </Page>
    );
  }
}

export default observer(WeatherShade);
