import React from 'react';
import { RouteWithModels, ModelLocation } from '@apps';
import savedSamples from 'models/savedSamples';
import config from 'common/config';
import StartNewSurvey from './StartNewSurvey';
import survey from './config';
import Location from './Location';
import Habitat from './Habitat';
import FlowerCover from './FlowerCover';

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
];

export default RouteWithModels.fromArray(savedSamples, routes);