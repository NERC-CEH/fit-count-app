import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Attr, Main } from '@apps';
import appModel from 'models/app';
import { NavContext, IonButton } from '@ionic/react';
import CustomAlert from '../Components/CustomAlert';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
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
        <Footer
          isEnabled={this.isValueValid()}
          title="Save my count"
          onClick={this.onFinish}
        />

        {this.state.showThanks && (
          <CustomAlert>
            <h1>Thanks!</h1>
            <IonButton color="secondary" onClick={this.uploadSurvey}>
              Upload
            </IonButton>
            <IonButton color="medium" onClick={this.goHome}>
              Go Home
            </IonButton>
          </CustomAlert>
        )}
      </Page>
    );
  }
}

export default observer(WeatherWind);
