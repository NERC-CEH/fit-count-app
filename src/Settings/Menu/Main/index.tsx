import { FC } from 'react';
import { observer } from 'mobx-react';
import {
  Main,
  useAlert,
  InfoMessage,
  MenuAttrToggle,
  MenuAttrItem,
} from '@flumens';
import {
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonItemDivider,
} from '@ionic/react';
import { Trans as T } from 'react-i18next';
import {
  warningOutline,
  personRemoveOutline,
  shareSocialOutline,
  globeOutline,
  languageOutline,
} from 'ionicons/icons';
import languages from 'common/languages';
import countries from 'common/countries';
import './styles.scss';

function useUserDeleteDialog(deleteUser: any) {
  const alert = useAlert();

  const showUserDeleteDialog = () => {
    alert({
      header: 'Account delete',
      message: (
        <>
          <T>Are you sure you want to delete your account?</T>
          <InfoMessage
            color="danger"
            icon={warningOutline}
            className="destructive-warning"
          >
            This will remove your account on the FIT Count website. You will
            lose access to any records that you have previously submitted using
            the app or website.
          </InfoMessage>
        </>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: deleteUser,
        },
      ],
    });
  };

  return showUserDeleteDialog;
}

type Props = {
  deleteUser: any;
  isLoggedIn: boolean;
  onToggle: any;
  language: string;
  country: string;
  sendAnalytics?: boolean;
};

const MenuMain: FC<Props> = ({
  isLoggedIn,
  deleteUser,
  sendAnalytics,
  language,
  country,
  onToggle,
}) => {
  const showUserDeleteDialog = useUserDeleteDialog(deleteUser);

  const countryName = ({ value }: any) => value === country;
  const selectedCountries: any = countries.find(countryName) || {};

  const onSendAnalyticsToggle = (checked: boolean) =>
    onToggle('sendAnalytics', checked);

  return (
    <Main>
      <IonList lines="full">
        <IonItemDivider>
          <T>Settings</T>
        </IonItemDivider>

        <div className="rounded">
          <MenuAttrItem
            routerLink="/settings/language"
            value={(languages as any)[language]}
            label="Language"
            icon={languageOutline}
            routerOptions={{ unmount: true }} // Pick a new language on return
            skipValueTranslation
          />
          <MenuAttrItem
            routerLink="/settings/country"
            value={selectedCountries.label}
            label="Country"
            icon={globeOutline}
          />

          <MenuAttrToggle
            className="exception-rounded"
            icon={shareSocialOutline}
            label="Share App Analytics"
            value={sendAnalytics}
            onChange={onSendAnalyticsToggle}
          />

          <InfoMessage color="medium">
            Share app crash data so we can make the app more reliable.
          </InfoMessage>
        </div>

        <div className="rounded destructive-item">
          {isLoggedIn && (
            <>
              <IonItem onClick={showUserDeleteDialog}>
                <IonIcon icon={personRemoveOutline} size="small" slot="start" />
                <IonLabel>
                  <T>Delete account</T>
                </IonLabel>
              </IonItem>
              <InfoMessage color="medium">
                You can delete your user account from the system.
              </InfoMessage>
            </>
          )}
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MenuMain);
