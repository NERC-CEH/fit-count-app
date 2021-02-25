import React from 'react';
import { observer } from 'mobx-react';
import {
  Page,
  ModelLocation,
  Main,
  InfoButton,
  alert,
  InfoMessage,
} from '@apps';
import { NavContext } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import './styles.scss';

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

  isValueValid = () => !!this.props.sample.attrs.location;

  render() {
    const { mapProviderOptions, sample } = this.props;

    const location = sample.attrs.location || {};

    return (
      <Page id="survey-location-page">
        <Header
          surveyProgressIndex={PAGE_INDEX}
          onCancel={this.deleteSubSampleOrSurvey}
          backButtonLabel="Cancel"
        />

        <InfoMessage icon={locationOutline}>
          Use the map to zoom in and tap on your <b>location</b>.
          <InfoButton label="Read more" header="Location" skipTranslation>
            This is attribute page info example.
            <br />
            <br />
            We can put any text or illustrations in it.
          </InfoButton>
        </InfoMessage>

        <Main>
          <ModelLocation.Map
            sample={sample}
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
