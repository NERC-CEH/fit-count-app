import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { IonItem, IonLabel, IonFooter } from '@ionic/react';
import './styles.scss';

function Footer(props) {
  const { isEnabled, link } = props;

  const navigateTo = isEnabled ? link : false;

  return (
    <IonFooter className="ion-no-border">
      <div id="survey-footer">
        <IonItem
          lines="none"
          className="next-button"
          routerLink={navigateTo}
          detail
          disabled={!isEnabled}
        >
          <IonLabel className="ion-text-center">
            <T>Next</T>
          </IonLabel>
        </IonItem>
      </div>
    </IonFooter>
  );
}

Footer.propTypes = exact({
  isEnabled: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
});

export default observer(Footer);
