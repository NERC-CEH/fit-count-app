import { observer } from 'mobx-react';
import {
  warningOutline,
  personRemoveOutline,
  shareSocialOutline,
  globeOutline,
  languageOutline,
  cloudDownloadOutline,
  cloudUploadOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Main, useAlert, InfoMessage, Toggle, MenuAttrItem } from '@flumens';
import { IonIcon, IonList, IonItem, IonLabel, isPlatform } from '@ionic/react';
import countries from 'common/countries';
import languages from 'common/languages';
import './styles.scss';

function useDatabaseExportDialog(exportFn: any) {
  const alert = useAlert();

  const showDatabaseExportDialog = () => {
    alert({
      header: 'Export',
      message: (
        <T>
          Are you sure you want to export the data?
          <p className="my-2 font-bold">
            This feature is intended solely for technical support and is not a
            supported method for exporting your data
          </p>
        </T>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Export',
          handler: exportFn,
        },
      ],
    });
  };

  return showDatabaseExportDialog;
}

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
            prefix={<IonIcon src={warningOutline} className="size-6" />}
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
  exportDatabase: any;
  importDatabase: any;
  language: string;
  country: string;
  sendAnalytics?: boolean;
};

const MenuMain = ({
  isLoggedIn,
  deleteUser,
  sendAnalytics,
  language,
  country,
  onToggle,
  exportDatabase,
  importDatabase,
}: Props) => {
  const showDatabaseExportDialog = useDatabaseExportDialog(exportDatabase);
  const showUserDeleteDialog = useUserDeleteDialog(deleteUser);

  const countryName = ({ value }: any) => value === country;
  const selectedCountries: any = countries.find(countryName) || {};

  const onSendAnalyticsToggle = (checked: boolean) =>
    onToggle('sendAnalytics', checked);

  return (
    <Main>
      <IonList lines="full">
        <h3 className="list-title">
          <T>Settings</T>
        </h3>

        <div className="rounded-list">
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

          <Toggle
            className="exception-rounded"
            prefix={<IonIcon src={shareSocialOutline} className="size-6" />}
            label="Share App Analytics"
            defaultSelected={sendAnalytics}
            onChange={onSendAnalyticsToggle}
          />

          <InfoMessage>
            Share app crash data so we can make the app more reliable.
          </InfoMessage>

          <IonItem onClick={showDatabaseExportDialog}>
            <IonIcon icon={cloudDownloadOutline} size="small" slot="start" />
            <T>Export database</T>
          </IonItem>

          {!isPlatform('hybrid') && (
            <IonItem onClick={importDatabase}>
              <IonIcon icon={cloudUploadOutline} size="small" slot="start" />
              Import database
            </IonItem>
          )}
        </div>

        <div className="destructive-item rounded-list mt-5">
          {isLoggedIn && (
            <>
              <IonItem onClick={showUserDeleteDialog}>
                <IonIcon icon={personRemoveOutline} size="small" slot="start" />
                <IonLabel>
                  <T>Delete account</T>
                </IonLabel>
              </IonItem>
              <InfoMessage>
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
