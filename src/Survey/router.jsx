import { RouteWithModels, AttrPage } from '@flumens';
import savedSamples from 'models/collections/samples';
import Activities from './Activities';
import Flower from './Flower';
import FlowerCount from './FlowerCount';
import FlowerCover from './FlowerCover';
import FlowerPatch from './FlowerPatch';
import Habitat from './Habitat';
import InsectCount from './InsectCount';
import Location from './Location';
import LocationName from './LocationName';
import StartNewSurvey from './StartNewSurvey';
import WeatherShade from './WeatherShade';
import WeatherSky from './WeatherSky';
import WeatherWind from './WeatherWind';
import survey from './config';

const baseURL = `/survey/new`;

const { AttrPageFromRoute } = AttrPage;

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId/location`, Location],
  [`${baseURL}/:smpId/location-name`, LocationName],
  [`${baseURL}/:smpId/habitat`, Habitat],
  [`${baseURL}/:smpId/habitat/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/flower-cover`, FlowerCover],
  [`${baseURL}/:smpId/flower`, Flower],
  [`${baseURL}/:smpId/flower/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/flower-count`, FlowerCount],
  [`${baseURL}/:smpId/flower-patch`, FlowerPatch],
  [`${baseURL}/:smpId/insect-count`, InsectCount],
  [`${baseURL}/:smpId/weather-sky`, WeatherSky],
  [`${baseURL}/:smpId/weather-shade`, WeatherShade],
  [`${baseURL}/:smpId/weather-wind`, WeatherWind],
  [`${baseURL}/:smpId/activities`, Activities],
];

export default RouteWithModels.fromArray(savedSamples, routes);
