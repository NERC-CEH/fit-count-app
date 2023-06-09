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
import hasWebGL from 'common/helpers/webGLSupport';
import Leaflet, { LatLngExpression, Map } from 'leaflet';
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
import COUNTRIES_CENTROID from './country_centroide';
import './styles.scss';

const DEFAULT_ZOOM = 5;
const DEFAULT_CENTER: LatLngExpression = [51.505, -0.09];

const MapBoxAttribution =
  '<a href="http://mapbox.com/about/maps" class="mapbox-wordmark" target="_blank">Mapbox</a><input type="checkbox" id="toggle-info"> <label for="toggle-info"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDIyLjY4NiA0MjIuNjg2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MjIuNjg2IDQyMi42ODY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBzdHlsZT0iZmlsbDojMDEwMDAyOyIgZD0iTTIxMS4zNDMsNDIyLjY4NkM5NC44MDQsNDIyLjY4NiwwLDMyNy44ODIsMCwyMTEuMzQzQzAsOTQuODEyLDk0LjgxMiwwLDIxMS4zNDMsMA0KCQkJczIxMS4zNDMsOTQuODEyLDIxMS4zNDMsMjExLjM0M0M0MjIuNjg2LDMyNy44ODIsMzI3Ljg4Miw0MjIuNjg2LDIxMS4zNDMsNDIyLjY4NnogTTIxMS4zNDMsMTYuMjU3DQoJCQljLTEwNy41NzQsMC0xOTUuMDg2LDg3LjUyLTE5NS4wODYsMTk1LjA4NnM4Ny41MiwxOTUuMDg2LDE5NS4wODYsMTk1LjA4NnMxOTUuMDg2LTg3LjUyLDE5NS4wODYtMTk1LjA4Ng0KCQkJUzMxOC45MDgsMTYuMjU3LDIxMS4zNDMsMTYuMjU3eiIvPg0KCTwvZz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBzdHlsZT0iZmlsbDojMDEwMDAyOyIgZD0iTTIzMS45LDEwNC42NDdjMC4zNjYsMTEuMzIzLTcuOTM0LDIwLjM3LTIxLjEzNCwyMC4zN2MtMTEuNjg5LDAtMTkuOTk2LTkuMDU1LTE5Ljk5Ni0yMC4zNw0KCQkJCWMwLTExLjY4OSw4LjY4MS0yMC43NDQsMjAuNzQ0LTIwLjc0NEMyMjMuOTc1LDgzLjkwMywyMzEuOSw5Mi45NTgsMjMxLjksMTA0LjY0N3ogTTE5NC45MzEsMzM4LjUzMVYxNTUuOTU1aDMzLjE4OXYxODIuNTc2DQoJCQkJQzIyOC4xMiwzMzguNTMxLDE5NC45MzEsMzM4LjUzMSwxOTQuOTMxLDMzOC41MzF6Ii8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" /></label> <div>Leaflet © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong></div>';

const PAGE_INDEX = 1;

type Props = {
  sample: Sample;
};

const Location: FC<Props> = ({ sample: model }) => {
  const toast = useToast();
  const { t } = useTranslation();

  const [map, setMap] = useState<Map | null>();

  const [locationName, setLocationName] = useState('');

  const assignTileSet = (mapRef: Leaflet.Map) => {
    setMap(mapRef);

    const suppportsWebGL = hasWebGL();

    const layer = suppportsWebGL
      ? (Leaflet as any).mapboxGL({
          accessToken: config.map.mapboxApiKey,
          style: 'mapbox://styles/mapbox/satellite-streets-v11',
          attribution: MapBoxAttribution,
        })
      : Leaflet.tileLayer(
          'https://api.mapbox.com/styles/v1/cehapps/cipqvo0c0000jcknge1z28ejp/tiles/256/{z}/{x}/{y}?access_token={accessToken}',
          {
            attribution:
              '<a href="http://mapbox.com/about/maps" class="mapbox-wordmark" target="_blank">Mapbox</a><input type="checkbox" id="toggle-info"> <label for="toggle-info"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjEuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDIyLjY4NiA0MjIuNjg2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MjIuNjg2IDQyMi42ODY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBzdHlsZT0iZmlsbDojMDEwMDAyOyIgZD0iTTIxMS4zNDMsNDIyLjY4NkM5NC44MDQsNDIyLjY4NiwwLDMyNy44ODIsMCwyMTEuMzQzQzAsOTQuODEyLDk0LjgxMiwwLDIxMS4zNDMsMA0KCQkJczIxMS4zNDMsOTQuODEyLDIxMS4zNDMsMjExLjM0M0M0MjIuNjg2LDMyNy44ODIsMzI3Ljg4Miw0MjIuNjg2LDIxMS4zNDMsNDIyLjY4NnogTTIxMS4zNDMsMTYuMjU3DQoJCQljLTEwNy41NzQsMC0xOTUuMDg2LDg3LjUyLTE5NS4wODYsMTk1LjA4NnM4Ny41MiwxOTUuMDg2LDE5NS4wODYsMTk1LjA4NnMxOTUuMDg2LTg3LjUyLDE5NS4wODYtMTk1LjA4Ng0KCQkJUzMxOC45MDgsMTYuMjU3LDIxMS4zNDMsMTYuMjU3eiIvPg0KCTwvZz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBzdHlsZT0iZmlsbDojMDEwMDAyOyIgZD0iTTIzMS45LDEwNC42NDdjMC4zNjYsMTEuMzIzLTcuOTM0LDIwLjM3LTIxLjEzNCwyMC4zN2MtMTEuNjg5LDAtMTkuOTk2LTkuMDU1LTE5Ljk5Ni0yMC4zNw0KCQkJCWMwLTExLjY4OSw4LjY4MS0yMC43NDQsMjAuNzQ0LTIwLjc0NEMyMjMuOTc1LDgzLjkwMywyMzEuOSw5Mi45NTgsMjMxLjksMTA0LjY0N3ogTTE5NC45MzEsMzM4LjUzMVYxNTUuOTU1aDMzLjE4OXYxODIuNTc2DQoJCQkJQzIyOC4xMiwzMzguNTMxLDE5NC45MzEsMzM4LjUzMSwxOTQuOTMxLDMzOC41MzF6Ii8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" /></label> <div>Leaflet © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong></div>',
            accessToken: config.map.mapboxApiKey,
            tileSize: 256, // specify as, OS layer overwites this with 200 otherwise,
          }
        );

    layer.addTo(mapRef);
  };

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

  const hasLocationName = !!model.attrs['location-name'];

  const selectedCountry = COUNTRIES_CENTROID[country];

  const mapCenter = selectedCountry
    ? [selectedCountry.lat, selectedCountry.lng]
    : DEFAULT_CENTER;

  const mapZoom = selectedCountry?.zoom || DEFAULT_ZOOM;

  return (
    <Page id="survey-location-page">
      <Header
        sample={model}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Home"
      />

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
            onGPSClick={startGPS}
            whenCreated={assignTileSet}
            defaultCenter={mapCenter}
            defaultZoom={mapZoom}
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
