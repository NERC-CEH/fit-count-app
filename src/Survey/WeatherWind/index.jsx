import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Attr, Main } from '@apps';
import { NavContext } from '@ionic/react';
import Header from '../Components/Header';
import './styles.scss';

const PAGE_INDEX = 10;

class WeatherWind extends React.Component {
  static contextType = NavContext;

  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
  });

  onValueChange = value => {
    const { sample } = this.props;
    sample.attrs['weather-wind'] = value;
    sample.save();
  };

  isValueValid = () => !!this.props.sample.attrs['weather-wind'];

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();

    const value = sample.attrs['weather-wind'];

    return (
      <Page id="survey-weather-wind-page">
        <Header surveyProgressIndex={PAGE_INDEX} backButtonLabel="Shade" />

        <Main>
          <Attr
            attrConfig={surveyConfig.attrs['weather-wind']}
            onValueChange={this.onValueChange}
            initialVal={value}
            model={sample}
          />
        </Main>
      </Page>
    );
  }
}

export default observer(WeatherWind);
