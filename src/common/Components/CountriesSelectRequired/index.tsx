import { observer } from 'mobx-react';
import { globeOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { Page, Main } from '@flumens';
import { IonList, IonIcon } from '@ionic/react';
import countries, { Country } from 'common/countries';
import appModel from 'models/app';
import CountryButton from './CountryButton';
import './styles.scss';

function CountriesSelectRequired({ children }: any) {
  const { t } = useTranslation();

  if (appModel.attrs.country) {
    return children;
  }

  const alphabetically = (country1: Country, country2: Country) =>
    t(country1.label).localeCompare(t(country2.label));

  const getCountry = (country: Country) => {
    const selectCountryAndAdjustLanguge = () => {
      appModel.attrs.country = country.value; // eslint-disable-line no-param-reassign
      appModel.save();
    };

    return (
      <CountryButton
        key={country.label}
        country={country}
        onClick={selectCountryAndAdjustLanguge}
      />
    );
  };

  const countriesEntries = countries.sort(alphabetically).map(getCountry);

  return (
    <Page id="country-select">
      <Main>
        <IonList className="ion-no-padding">
          <div className="header">
            <IonIcon icon={globeOutline} />
          </div>
          <div className="countries-container">{countriesEntries}</div>
        </IonList>
      </Main>
    </Page>
  );
}

export default observer(CountriesSelectRequired);
