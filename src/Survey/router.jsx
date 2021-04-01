import React from 'react';
import { RouteWithModels, ModelLocation, AttrPage as Attr } from '@apps';
import savedSamples from 'models/savedSamples';
import config from 'common/config';
import StartNewSurvey from './StartNewSurvey';
import survey from './config';
import Location from './Location';
import Habitat from './Habitat';
import FlowerCover from './FlowerCover';
import Flower from './Flower';
import FlowerCount from './FlowerCount';
import FlowerPatch from './FlowerPatch';
import InsectCount from './InsectCount';
import WeatherSky from './WeatherSky';
import WeatherShade from './WeatherShade';
import WeatherWind from './WeatherWind';

const baseURL = `/survey/new`;

const ModelLocationWrap = props => (
  <Location
    model={props.sample} // eslint-disable-line
    mapProviderOptions={config.map}
    onGPSClick={ModelLocation.utils.onGPSClick}
    geocodingParams={{
      access_token: config.map.mapboxApiKey,
    }}
  />
);

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId/location`, ModelLocationWrap],
  [`${baseURL}/:smpId/habitat`, Habitat],
  [`${baseURL}/:smpId/habitat/:attr`, Attr],
  [`${baseURL}/:smpId/flower-cover`, FlowerCover],
  [`${baseURL}/:smpId/flower`, Flower],
  [`${baseURL}/:smpId/flower/:attr`, Attr],
  [`${baseURL}/:smpId/flower-count`, FlowerCount],
  [`${baseURL}/:smpId/flower-patch`, FlowerPatch],
  [`${baseURL}/:smpId/insect-count`, InsectCount],
  [`${baseURL}/:smpId/weather-sky`, WeatherSky],
  [`${baseURL}/:smpId/weather-shade`, WeatherShade],
  [`${baseURL}/:smpId/weather-wind`, WeatherWind],
];

export default RouteWithModels.fromArray(savedSamples, routes);
