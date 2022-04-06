import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { observer } from 'mobx-react';
import appModel from 'models/app';
import { Page, Main } from '@flumens';
import { IonList, IonIcon } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import countries from 'common/countries';
import CountryButton from './CountryButton';
import './styles.scss';

const alphabetically = (country1, country2) =>
  country1.label.localeCompare(country2.label);

const getCountry = country => (
  <CountryButton key={country.label} country={country} appModel={appModel} />
);

const countriesEntries = () => countries.sort(alphabetically).map(getCountry);

function CountrySelect({ children }) {
  if (appModel.attrs.country) {
    return children;
  }

  return (
    <Page id="country-select">
      <Main>
        <IonList className="ion-no-padding">
          <div className="header">
            <IonIcon icon={globeOutline} />
          </div>
          <div className="countries-container">{countriesEntries()}</div>
        </IonList>
      </Main>
    </Page>
  );
}

CountrySelect.propTypes = exact({
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
});

export default observer(CountrySelect);
