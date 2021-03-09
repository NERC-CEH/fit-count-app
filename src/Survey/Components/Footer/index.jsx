import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { IonItem, IonLabel, IonFooter, IonIcon } from '@ionic/react';
import clsx from 'clsx';
import './styles.scss';
import { flagOutline, chevronForwardOutline } from 'ionicons/icons';

function Footer(props) {
  const { isEnabled, link, title } = props;

  const navigateTo = isEnabled ? link : false;

  const footerTitle = title || 'Next';

  const icon = title ? flagOutline : chevronForwardOutline;

  return (
    <IonFooter className="ion-no-border">
      <div id="survey-footer">
        <IonItem
          lines="none"
          className={clsx('next-button', title && 'finish-button')}
          routerLink={navigateTo}
          disabled={!isEnabled}
          mode="md"
        >
          <IonIcon slot="end" color="light" icon={icon} />
          <IonLabel className="ion-text-center">
            <T>{footerTitle}</T>
          </IonLabel>
        </IonItem>
      </div>
    </IonFooter>
  );
}

Footer.propTypes = exact({
  isEnabled: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string,
});

export default observer(Footer);
