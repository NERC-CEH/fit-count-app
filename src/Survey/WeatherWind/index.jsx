import React from 'react';
import { withTranslation, Trans as T } from 'react-i18next';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Attr, Main, InfoMessage, device, toast } from '@apps';
import appModel from 'models/app';
import userModel from 'models/user';
import { NavContext, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { checkmarkOutline, informationCircleOutline } from 'ionicons/icons';
import surveyStatistics from './surveyStatistics.json';
import CustomAlert from '../Components/CustomAlert';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './styles.scss';

const { warn } = toast;

const PAGE_INDEX = 10;

@observer
class WeatherWind extends React.Component {
  static contextType = NavContext;

  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
    i18n: PropTypes.object, // eslint-disable-line
    tReady: PropTypes.bool, // eslint-disable-line
    t: PropTypes.func,
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

  uploadSurvey = async () => {
    const { sample, t } = this.props;

    if (!device.isOnline()) {
      warn(t('Looks like you are offline!'));
      return;
    }

    const isActivated = await userModel.checkActivation();
    if (!isActivated) {
      return;
    }

    sample.upload();

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

  getAverageInsectCount = month => {
    const byMonth = obj => obj.month_name === month;

    const insectsData = surveyStatistics.find(byMonth);

    if (!insectsData) {
      return null;
    }

    return parseFloat(insectsData.average).toFixed(0);
  };

  render() {
    const { sample, t } = this.props;

    const surveyConfig = sample.getSurvey();
    const attr = surveyConfig.attrs['weather-wind'];
    const value = sample.attrs['weather-wind'];

    const numberOfOccurrences = sample.getInsectCount();

    const englishFormat = Intl.DateTimeFormat('en', { month: 'long' });

    const englishMonth = englishFormat.format(
      new Date(sample.metadata.created_on)
    );

    const month = t(englishMonth);

    const averageInsectCountForThisMonth = this.getAverageInsectCount(month);

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

        {this.isValueValid() && (
          <Footer title="Save my count" onClick={this.onFinish} />
        )}

        {this.state.showThanks && (
          <CustomAlert>
            <div className="center">
              <IonIcon icon={checkmarkOutline} />
            </div>

            <h3>
              <T>
                Thanks for completing your FIT Count - all results help us to
                monitor insect populations.
              </T>
            </h3>

            {!!averageInsectCountForThisMonth && (
              <p>
                <T>
                  You counted <b>{{ numberOfOccurrences }} </b>insect(s)
                  altogether - the UK average for <b>{{ month }}</b> is{' '}
                  <b>{{ averageInsectCountForThisMonth }}</b> insects per count.
                </T>
              </p>
            )}

            <div className="button-wrapper">
              <IonItem
                color="secondary"
                onClick={this.uploadSurvey}
                className="next-button"
                lines="none"
              >
                <IonLabel>
                  <T>Upload</T>
                </IonLabel>
              </IonItem>

              <IonItem
                color="medium"
                onClick={this.goHome}
                className="next-button home"
                lines="none"
              >
                <IonLabel>
                  <T>Go Home</T>
                </IonLabel>
              </IonItem>
            </div>
          </CustomAlert>
        )}
      </Page>
    );
  }
}

export default withTranslation()(WeatherWind);
