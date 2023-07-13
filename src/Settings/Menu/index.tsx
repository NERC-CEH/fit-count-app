import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Page, Header, useToast, PickByType, useLoader } from '@flumens';
import { isPlatform, NavContext } from '@ionic/react';
import appModel, { Attrs as AppModelAttrs } from 'models/app';
import userModel from 'models/user';
import Main from './Main';

const useDeleteUser = () => {
  const toast = useToast();
  const loader = useLoader();
  const { goBack } = useContext(NavContext);

  const deleteUser = async () => {
    console.log('Settings:Menu:Controller: deleting the user!');

    await loader.show('Please wait...');

    try {
      await userModel.delete();
      goBack();
      toast.success('Done');
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();
  };

  return deleteUser;
};

function onToggle(
  setting: keyof PickByType<AppModelAttrs, boolean>,
  checked: boolean
) {
  appModel.attrs[setting] = checked; // eslint-disable-line
  appModel.save();

  isPlatform('hybrid') && Haptics.impact({ style: ImpactStyle.Light });
}

const MenuController: FC = () => {
  const deleteUser = useDeleteUser();

  const { sendAnalytics, language, country } = appModel.attrs;

  return (
    <Page id="settings">
      <Header title="Settings" />
      <Main
        language={language}
        country={country}
        isLoggedIn={userModel.isLoggedIn()}
        deleteUser={deleteUser}
        sendAnalytics={sendAnalytics}
        onToggle={onToggle}
      />
    </Page>
  );
};

export default observer(MenuController);
