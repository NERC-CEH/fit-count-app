import React from 'react';
import { RouteWithModels, ModelLocation, AttrPage as Attr } from '@apps';
import savedSamples from 'models/savedSamples';
import config from 'common/config';
import StartNewSurvey from './StartNewSurvey';
import survey from './config';
import Location from './Location';
import Habitat from './Habitat';
import FlowerCover from './FlowerCover';
import FlowerSelection from './FlowerSelection';

const baseURL = `/survey/new`;

const ModelLocationWrap = props => (
  <Location
    mapProviderOptions={config.map}
    onGPSClick={ModelLocation.utils.onGPSClick}
    {...props}
  />
);

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId/location`, ModelLocationWrap],
  [`${baseURL}/:smpId/habitat`, Habitat],
  [`${baseURL}/:smpId/flower-cover`, FlowerCover],
  [`${baseURL}/:smpId/flower-selection`, FlowerSelection],
  [`${baseURL}/:smpId/flower-selection/:attr`, Attr],
];

export default RouteWithModels.fromArray(savedSamples, routes);
