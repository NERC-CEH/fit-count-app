import React from 'react';
import { Trans as T } from 'react-i18next';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Attr, Main, InfoMessage } from '@apps';
import appModel from 'models/app';
import { NavContext, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { checkmarkOutline, informationCircleOutline } from 'ionicons/icons';
import CustomAlert from '../Components/CustomAlert';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './styles.scss';

const PAGE_INDEX = 10;

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const insectsPerMonthData = [
  {
    month: 4,
    month_name: 'April',
    average: 4.32,
  },
  {
    month: 5,
    month_name: 'May',
    average: 6.05,
  },
  {
    month: 6,
    month_name: 'June',
    average: 13.03,
  },
  {
    month: 7,
    month_name: 'July',
    average: 14.7,
  },
  {
    month: 8,
    month_name: 'August',
    average: 12.44,
  },
  {
    month: 9,
    month_name: 'September',
    average: 11.24,
  },
];

class WeatherWind extends React.Component {
  static contextType = NavContext;

  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
  });

  state = { showThanks: false };

  _processDraft = async () => {
    const { sample } = this.props;

    appModel.attrs['draftId:survey'] = null;
    await appModel.save();

    sample.metadata.saved = true;
    sample.save();
  };

  goHome = () => {
    this.context.navigate('/home/surveys', 'root');
  };

  uploadSurvey = () => {
    const { sample } = this.props;
    sample.saveRemote();

    this.goHome();
  };

  onFinish = async () => {
    const { sample } = this.props;

    if (!sample.metadata.saved) {
      await this._processDraft();
    }

    this.setState({ showThanks: true });
  };

  onValueChange = value => {
    const { sample } = this.props;
    sample.attrs['weather-wind'] = value;
    sample.save();
  };

  isValueValid = () => !!this.props.sample.attrs['weather-wind'];

  setNumberOfOccurences = () => {
    const { sample } = this.props;

    const byExistingOccurrences = occ => occ.attrs.count;
    const addOccurrences = (acc, occ) => acc + occ.attrs.count;

    return sample.occurrences
      .filter(byExistingOccurrences)
      .reduce(addOccurrences, 0);
  };

  setAverageInsectCount = month => {
    const byMonth = obj => obj.month_name === month;

    const insectsData = insectsPerMonthData.find(byMonth);

    if (!insectsData) {
      return 0;
    }

    return insectsData.average;
  };

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();
    const attr = surveyConfig.attrs['weather-wind'];
    const value = sample.attrs['weather-wind'];

    const numberOfOccurrences = this.setNumberOfOccurences();

    const month = monthNames[new Date().getMonth()];

    const expectedNumberOfOccurrences = this.setAverageInsectCount();

    return (
      <Page id="survey-weather-wind-page">
        <Header surveyProgressIndex={PAGE_INDEX} backButtonLabel="Shade" />

        <Main>
          <InfoMessage icon={informationCircleOutline}>
            What was the <b>wind</b> strength?
          </InfoMessage>

          <Attr
            component={attr.type}
            componentProps={attr.componentProps}
            onChange={this.onValueChange}
            value={value}
          />
        </Main>
        <Footer
          isEnabled={this.isValueValid()}
          title="Save my count"
          onClick={this.onFinish}
        />

        {this.state.showThanks && (
          <CustomAlert>
            <div className="center">
              <IonIcon icon={checkmarkOutline} />
            </div>

            <h1>
              <T>
                Thanks for completing your FIT Count - all results help us to
                monitor insect population
              </T>
            </h1>

            <p>
              <T>
                You counted <b>{{ numberOfOccurrences }} </b>insects altogether
                - the UK average for <b>{{ month }}</b> is{' '}
                <b>{{ expectedNumberOfOccurrences }}</b> insects per count.
              </T>
            </p>
            <IonItem
              color="secondary"
              onClick={this.uploadSurvey}
              className="next-button"
            >
              <IonLabel>
                <T>Upload</T>
              </IonLabel>
            </IonItem>

            <IonItem
              color="medium"
              onClick={this.goHome}
              className="next-button-home"
            >
              <IonLabel>
                <T>Go Home</T>
              </IonLabel>
            </IonItem>
          </CustomAlert>
        )}
      </Page>
    );
  }
}

export default observer(WeatherWind);
