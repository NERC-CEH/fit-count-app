import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { IonItem, IonLabel } from '@ionic/react';
import './styles.scss';

function Footer(props) {
  const { isEnabled, link } = props;

  const buttonStyles = isEnabled ? 'next-button' : 'next-button disable';

  const navigateTo = isEnabled ? link : false;

  return (
    <div id="survey-footer">
      <IonItem
        lines="none"
        className={buttonStyles}
        detail={isEnabled}
        routerLink={navigateTo}
      >
        <IonLabel className="ion-text-center">
          <T>Next</T>
        </IonLabel>
      </IonItem>
    </div>
  );
}

Footer.propTypes = exact({
  isEnabled: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
});

export default observer(Footer);
