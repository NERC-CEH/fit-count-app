import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import {
  Page,
  ModelLocation,
  Main,
  InfoButton,
  alert,
  InfoMessage,
  toast,
} from '@apps';
import { NavContext } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import './styles.scss';

const { warn } = toast;

const PAGE_INDEX = 1;

function showDeleteSurveyAlertMessage() {
  const deleteSurvey = resolve => {
    alert({
      header: 'Delete Survey',
      message: (
        <T>
          Warning - This will discard the survey information you have entered so
          far.
        </T>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => resolve(false),
        },
        {
          text: 'Discard',
          cssClass: 'primary',
          handler: () => resolve(true),
        },
      ],
    });
  };

  return new Promise(deleteSurvey);
}

class Location extends ModelLocation {
  static contextType = NavContext;

  static propTypes = exact({
    model: PropTypes.object.isRequired,
    onGPSClick: PropTypes.func.isRequired,
    mapProviderOptions: PropTypes.object,
  });

  deleteSubSampleOrSurvey = async () => {
    const { sample } = this.props;
    const discard = await showDeleteSurveyAlertMessage();

    if (!discard) {
      return;
    }

    await sample.destroy();

    this.context.navigate('/home/info', 'root');
  };

  navigateNext = () => this.context.navigate('habitat');

  isValueValid = () => {
    const { location } = this.props.model.attrs;

    if (location && location.source === 'map' && location.accuracy >= 50) {
      warn('Please select a more accurate location');
      return false;
    }

    return !!location;
  };

  render() {
    const { mapProviderOptions, model } = this.props;

    const location = model.attrs.location || {};

    return (
      <Page id="survey-location-page">
        <Header surveyProgressIndex={PAGE_INDEX} backButtonLabel="Home" />

        <Main>
          <InfoMessage icon={locationOutline}>
            Use the map to zoom in and tap on your <b>location</b>.
            <InfoButton label="Read more" header="Info" skipTranslation>
              <p>
                Your location can be anywhere where there are flowers to attract
                pollinating insects, where you have permission to be, and where
                it is safe to go.
              </p>
              <p>
                A garden or park, farm or nature reserve are all great locations
                for FIT Counts.
              </p>
              <p>
                Please zoom in to find the spot that best matches your location.
              </p>
              <p>
                Your count results will be visible to others at the 1 km square
                level via the UKPoMS website.
              </p>
            </InfoButton>
          </InfoMessage>
          <ModelLocation.Map
            model={model}
            location={location}
            setLocation={this.setLocation}
            mapProviderOptions={mapProviderOptions}
            onGPSClick={this.onGPSClick}
          />
        </Main>

        <Footer isEnabled={this.isValueValid()} link="habitat" />
      </Page>
    );
  }
}

export default observer(Location);
