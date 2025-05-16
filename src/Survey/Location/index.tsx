import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  locationOutline,
  searchOutline,
  warningOutline,
  locateOutline,
} from 'ionicons/icons';
import { Trans as T, useTranslation } from 'react-i18next';
import {
  Page,
  Main,
  InfoButton,
  InfoMessage,
  useToast,
  device,
  prettyPrintLocation,
  MapHeader,
  MapContainer,
  mapEventToLocation,
  mapFlyToLocation,
} from '@flumens';
import { IonButton, IonSpinner, IonIcon } from '@ionic/react';
import config from 'common/config';
import countries from 'common/countries';
import appModel from 'models/app';
import Sample from 'models/sample';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import './styles.scss';

const DEFAULT_ZOOM = 5;
const DEFAULT_CENTER = { latitude: 51.505, longitude: -0.09 };

const PAGE_INDEX = 1;

type Props = {
  sample: Sample;
};

const Location = ({ sample: model }: Props) => {
  const toast = useToast();
  const { t } = useTranslation();

  const [mapRef, setMapRef] = useState<any>();

  const [locationName, setLocationName] = useState('');

  const isValueValid = () => model.data.location;

  const setLocation = (location: any) => {
    if (location && location.source === 'map' && location.accuracy >= 500) {
      toast.warn('Please select a more accurate location');
      return;
    }

    model.isGPSRunning() && model.stopGPS();
    // eslint-disable-next-line no-param-reassign
    model.data.location = { ...model.data.location, ...location };

    model.save();
  };

  const onMapClick = (e: any) => setLocation(mapEventToLocation(e));

  const onLocationNameSearch = ({ name: value, geocoded }: any) => {
    if (geocoded && mapRef) {
      setLocationName('');
      const [l1, l2] = geocoded.center;
      mapFlyToLocation(mapRef, { latitude: l2, longitude: l1 }, { zoom: 13 });
      return;
    }

    setLocationName(value);
  };

  const location = model.data.location || {};

  const flyToLocation = () => mapFlyToLocation(mapRef, location);
  useEffect(flyToLocation, [mapRef, location]);

  const { country } = appModel.data;
  const geocodedCountry = country === 'UK' ? 'GB' : country; // UK -> GB

  const startGPS = () => !model.isGPSRunning() && model.startGPS();

  const prettyLocation = prettyPrintLocation(location) || t('missing');

  const hasLocationName = !!model.data['location-name'];

  const byCountryId = ({ value }: any) => value === country;
  const selectedCountry = countries.find(byCountryId);

  const mapCenter = selectedCountry
    ? {
        latitude: selectedCountry.coords.lat,
        longitude: selectedCountry.coords.lng,
      }
    : DEFAULT_CENTER;

  const initialViewState = {
    ...mapCenter,
    zoom: selectedCountry?.coords.zoom || DEFAULT_ZOOM,
  };

  return (
    <Page id="survey-location-page">
      <Header
        sample={model}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Home"
      />

      <Main>
        <InfoMessage
          prefix={<IonIcon src={locationOutline} className="size-6" />}
          color="tertiary"
          className="!max-w-none"
        >
          Enable your GPS to set your location, or use the map to zoom in and
          tap on your <b>location</b>.
          <InfoButton label="READ MORE" header="Info" color="tertiary">
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
          <InfoMessage
            prefix={<IonIcon src={warningOutline} className="size-6" />}
            color="warning"
          >
            Looks like you're offline. The map view is only available with an
            internet connection. You can still use the GPS to set your current
            survey location.
          </InfoMessage>
        )}

        {device.isOnline && (
          <MapHeader>
            <MapHeader.LocationName
              onChange={onLocationNameSearch}
              value={locationName}
              placeholder="Search for a location..."
              inputProps={{ autofocus: false }}
              icon={searchOutline}
              geocodingParams={{
                access_token: config.map.mapboxApiKey,
                types: 'locality,place,district,neighborhood,region,postcode',
                country: geocodedCountry || 'GB',
              }}
            />
          </MapHeader>
        )}

        {device.isOnline && (
          <MapContainer
            onReady={setMapRef}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v10"
            onClick={onMapClick}
            accessToken={config.map.mapboxApiKey}
            maxPitch={0}
            initialViewState={initialViewState}
            maxZoom={19}
          >
            <MapContainer.Control.Geolocate
              isLocating={model.isGPSRunning()}
              onClick={startGPS}
            />

            <MapContainer.Marker.Circle {...location} />
          </MapContainer>
        )}

        {!device.isOnline && (
          <div className="offline-survey-location rounded">
            <T>
              Current survey location:{' '}
              <b>{{ location: prettyLocation } as any}</b>
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

      {isValueValid() && (
        <Footer link={hasLocationName ? 'location-name' : 'habitat'} />
      )}

      {!isValueValid() && !device.isOnline && (
        <Footer link="location-name" title="Skip" className="skip-button" />
      )}
    </Page>
  );
};

export default observer(Location);
