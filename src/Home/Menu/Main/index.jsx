import React from 'react';
import PropTypes from 'prop-types';
import { Main, Toggle, MenuNote, MenuAttrItem } from '@apps';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import exact from 'prop-types-exact';
import {
  IonIcon,
  IonItem,
  IonList,
  IonItemDivider,
  IonLabel,
} from '@ionic/react';
import {
  openOutline,
  lockClosedOutline,
  shareSocialOutline,
  heartOutline,
  languageOutline,
  globeOutline,
} from 'ionicons/icons';
import languages from 'common/languages';
import countries from 'common/countries';

@observer
class MenuComponent extends React.Component {
  static propTypes = exact({
    onToggle: PropTypes.func.isRequired,
    sendAnalytics: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  });

  render() {
    const { onToggle, sendAnalytics, config, language, country } = this.props;
    const baseURL = config.backend.url;

    const onSendAnalyticsToggle = checked => onToggle('sendAnalytics', checked);

    const countryName = ({ value }) => value === country;
    const selectedCountries = countries.find(countryName) || {};

    return (
      <Main>
        <IonList lines="full">
          <IonItemDivider>
            <T>Info</T>
          </IonItemDivider>

          <IonItem
            href={`${baseURL}/privacy-policy`}
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={lockClosedOutline} size="small" slot="start" />
            <T>Privacy Policy</T>
          </IonItem>
          <IonItem routerLink="/info/credits" detail>
            <IonIcon icon={heartOutline} size="small" slot="start" />
            <T>Credits</T>
          </IonItem>

          <IonItemDivider>
            <T>Settings</T>
          </IonItemDivider>

          <MenuAttrItem
            routerLink="/settings/language"
            value={languages[language]}
            label="Language"
            icon={languageOutline}
            skipValueTranslation
          />

          <MenuAttrItem
            routerLink="/settings/country"
            value={selectedCountries.label}
            label="Country"
            icon={globeOutline}
          />

          <IonItem>
            <IonIcon icon={shareSocialOutline} size="small" slot="start" />
            <IonLabel>
              <T>Share App Analytics</T>
            </IonLabel>
            <Toggle onToggle={onSendAnalyticsToggle} checked={sendAnalytics} />
          </IonItem>
          <MenuNote>
            Share app crash data so we can make the app more reliable.
          </MenuNote>
        </IonList>
      </Main>
    );
  }
}

export default MenuComponent;
