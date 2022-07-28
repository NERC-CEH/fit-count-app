import { useState, FC } from 'react';
import { observer } from 'mobx-react';
import {
  Page,
  ModelLocation,
  Main,
  InfoButton,
  InfoMessage,
  useToast,
  device,
  prettyPrintLocation,
} from '@flumens';
import Sample from 'models/sample';
import appModel from 'models/app';
import config from 'common/config';
import { Map } from 'leaflet';
import { Trans as T, useTranslation } from 'react-i18next';
import { IonButton, IonSpinner, IonIcon } from '@ionic/react';
import {
  locationOutline,
  searchOutline,
  warningOutline,
  locateOutline,
} from 'ionicons/icons';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import './styles.scss';

const PAGE_INDEX = 1;

type Props = {
  sample: Sample;
};

const Location: FC<Props> = ({ sample: model }) => {
  const toast = useToast();
  const { t } = useTranslation();

  const [map, setMap] = useState<Map | null>();

  const [locationName, setLocationName] = useState('');

  const isValueValid = () => model.attrs.location;

  const setLocation = (location: any) => {
    if (location && location.source === 'map' && location.accuracy >= 500) {
      toast.warn('Please select a more accurate location');
      return;
    }

    model.isGPSRunning() && model.stopGPS();
    // eslint-disable-next-line no-param-reassign
    model.attrs.location = { ...model.attrs.location, ...location };

    model.save();
  };

  const onLocationNameSearch = ({ target }: any, geocoded: any) => {
    if (geocoded && map) {
      setLocationName('');
      const [l1, l2] = geocoded.center;
      map.setView([l2, l1], 13);
      return;
    }

    setLocationName(target.value);
  };

  const location = model.attrs.location || {};

  let { country } = appModel.attrs;
  country = country === 'UK' ? 'GB' : country; // UK -> GB
  country = country || 'GB'; // default GB

  const startGPS = () => !model.isGPSRunning() && model.startGPS();

  const prettyLocation = prettyPrintLocation(location) || t('missing');

  return (
    <Page id="survey-location-page">
      <Header surveyProgressIndex={PAGE_INDEX} backButtonLabel="Home" />

      <Main>
        <InfoMessage icon={locationOutline}>
          Enable your GPS to set your location, or use the map to zoom in and
          tap on your <b>location</b>.
          <InfoButton label="READ MORE" header="Info">
            <p>
              Your location can be anywhere where there are flowers to attract
              pollinating insects, where you have permission to be, and where it
              is safe to go.
            </p>
            <p>
              A garden or park, farm or nature reserve are all great locations
              for FIT Counts.
            </p>
            <p>
              Please zoom in to find the spot that best matches your location.
            </p>
            <p>
              Make sure you have the GPS turned on and permissions granted. If
              you are conducting a FIT Count offline or without a network
              connection, the app will not find your location on the map, but
              your GPS should record this for uploading later.
            </p>
            <p>
              Your count results will be visible to others at the 1 km square
              level via the UKPoMS website.
            </p>
          </InfoButton>
        </InfoMessage>

        {!device.isOnline && (
          <InfoMessage icon={warningOutline} className="warning">
            Looks like you're offline. The map view is only available with an
            internet connection. You can still use the GPS to set your current
            survey location.
          </InfoMessage>
        )}

        {device.isOnline && (
          <ModelLocation.Header.LocationName
            value={locationName}
            onChange={onLocationNameSearch}
            geocodingParams={{
              access_token: config.map.mapboxApiKey,
              types: 'locality,place,district,neighborhood,region,postcode',
              country,
            }}
            icon={searchOutline}
            placeholder="Search for a location..."
            inputProps={{
              autofocus: false,
            }}
          />
        )}

        {device.isOnline && (
          <ModelLocation.Map
            model={model}
            location={location}
            setLocation={setLocation}
            mapProviderOptions={config.map}
            onGPSClick={ModelLocation.utils.onGPSClick}
            whenCreated={setMap}
          />
        )}

        {!device.isOnline && (
          <div className="offline-survey-location rounded">
            <T>
              Current survey location: <b>{{ location: prettyLocation }}</b>
            </T>
            <IonButton
              fill="outline"
              expand="block"
              size="small"
              onClick={startGPS}
            >
              <IonIcon icon={locateOutline} slot="start" />
              {model.isGPSRunning() ? <IonSpinner /> : <T>Refresh</T>}
            </IonButton>
          </div>
        )}
      </Main>

      {isValueValid() && <Footer link="habitat" />}

      {!isValueValid() && !device.isOnline && (
        <Footer link="habitat" title="Skip" className="skip-button" />
      )}
    </Page>
  );
};

export default observer(Location);
