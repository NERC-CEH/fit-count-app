import React from 'react';
import { Route } from 'react-router-dom';
import appModel from 'models/app';
import Language from './Language';
import Country from './Country';

const LanguageWrap = () => <Language appModel={appModel} />;

const CountryWrap = () => <Country appModel={appModel} />;

export default [
  <Route
    path="/settings/language"
    key="/settings/language"
    exact
    render={LanguageWrap}
  />,
  <Route
    path="/settings/country"
    key="/settings/country"
    exact
    render={CountryWrap}
  />,
];
