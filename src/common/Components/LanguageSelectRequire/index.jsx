import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { observer } from 'mobx-react';
import appModel from 'models/app';
import { Page, Main } from '@apps';
import { IonList, IonIcon, IonItemGroup } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import languages from 'common/languages';
import LanguageButton from './Component/LanguageButton';
import './styles.scss';

const alphabetically = ([, l1], [, l2]) => l1.localeCompare(l2);

const getLanguage = ([value, language]) => (
  <LanguageButton
    key={language}
    language={language}
    value={value}
    appModel={appModel}
  />
);

const languagesOptions = () =>
  Object.entries(languages).sort(alphabetically).map(getLanguage);

function LanguageSelect({ children }) {
  if (appModel.attrs.language) {
    return children;
  }

  return (
    <Page id="language-select">
      <div className="header">
        <IonIcon icon={globeOutline} />
      </div>

      <Main>
        <IonList className="language-select-list">
          <IonItemGroup>{languagesOptions()}</IonItemGroup>
        </IonList>
      </Main>
    </Page>
  );
}

LanguageSelect.propTypes = exact({
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
});

export default observer(LanguageSelect);
