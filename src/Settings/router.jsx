import React from 'react';
import { Route } from 'react-router-dom';
import appModel from 'models/app';
import Language from './Language';

const LanguageWrap = () => <Language appModel={appModel} />;

export default [
  <Route
    path="/settings/language"
    key="/settings/language"
    exact
    render={LanguageWrap}
  />,
];
