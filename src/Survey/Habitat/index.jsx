import React from 'react';
import { observer } from 'mobx-react';
import { Page, Main } from '@apps';
import Header from '../Components/Header';

function Habitat() {
  return (
    <Page id="habitat">
      <Header surveyProgressIndex={2} backButtonLabel="Location" />
      <Main>TODO:</Main>
    </Page>
  );
}

export default observer(Habitat);
