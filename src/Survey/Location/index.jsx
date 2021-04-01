import React from 'react';
import { observer } from 'mobx-react';
import {
  Page,
  ModelLocation,
  Main,
  InfoButton,
  InfoMessage,
  toast,
} from '@apps';
import { locationOutline, searchOutline } from 'ionicons/icons';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import './styles.scss';

const { warn } = toast;

const PAGE_INDEX = 1;

class Location extends ModelLocation {
  mapRef = React.createRef();

  isValueValid = () => this.props.model.attrs.location;

  setLocation = location => {
    const { model } = this.state;

    if (location && location.source === 'map' && location.accuracy >= 500) {
      warn('Please select a more accurate location');
      return;
    }

    model.isGPSRunning() && model.stopGPS();
    model.attrs.location = { ...model.attrs.location, ...location };

    model.save();
  };

  onLocationNameSearch = ({ target }, geocoded) => {
    if (geocoded) {
      this.setState({ locationName: '' });
      const [l1, l2] = geocoded.center;
      this.mapRef.current.setView([l2, l1], 13);
      return;
    }

    this.setState({ locationName: target.value });
  };

  render() {
    const { mapProviderOptions, model, geocodingParams } = this.props;

    const location = model.attrs.location || {};

    return (
      <Page id="survey-location-page">
        <Header surveyProgressIndex={PAGE_INDEX} backButtonLabel="Home" />

        <Main>
          <InfoMessage icon={locationOutline}>
            Use the map to zoom in and tap on your <b>location</b>.
            <InfoButton label="READ MORE" header="Info">
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

          <ModelLocation.Header.LocationName
            value={this.state.locationName}
            onChange={this.onLocationNameSearch}
            geocodingParams={geocodingParams}
            icon={searchOutline}
            placeholder="Search for a location..."
            inputProps={{
              autofocus: false,
            }}
          />

          <ModelLocation.Map
            ref={this.mapRef}
            model={model}
            location={location}
            setLocation={this.setLocation}
            mapProviderOptions={mapProviderOptions}
            onGPSClick={this.onGPSClick}
          />
        </Main>

        {this.isValueValid() && <Footer link="habitat" />}
      </Page>
    );
  }
}

export default observer(Location);
