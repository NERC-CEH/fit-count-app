import React from 'react';
import PropTypes from 'prop-types';
import { Main, Toggle, MenuNote } from '@apps';
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
} from 'ionicons/icons';

@observer
class MenuComponent extends React.Component {
  static propTypes = exact({
    onToggle: PropTypes.func.isRequired,
    sendAnalytics: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired,
  });

  render() {
    const { onToggle, sendAnalytics, config } = this.props;
    const baseURL = config.backend.url;

    const onSendAnalyticsToggle = checked => onToggle('sendAnalytics', checked);

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

          <IonItemDivider>
            <T>Settings</T>
          </IonItemDivider>

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
