import { FC } from 'react';
import { Page, device, useAlert, useLoader, useToast } from '@flumens';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import userModel from 'models/user';
import appModel from 'models/app';
import Main from './Main';
import './styles.scss';

function showLogoutConfirmationDialog(callback: any, alert: any) {
  alert({
    header: 'Logout',
    message: (
      <>
        <T>Are you sure you want to logout?</T>
        <br />
        <br />
        <T>
          Your pending and uploaded <b>records will not be deleted </b> from
          this device.
        </T>
      </>
    ),
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Logout',
        role: 'destructive',
        handler: () => callback(),
      },
    ],
  });
}

const MenuController: FC = () => {
  const alert = useAlert();
  const loader = useLoader();
  const toast = useToast();

  function logOut() {
    const onReset = async () => {
      appModel.save();
      userModel.logOut();
    };

    showLogoutConfirmationDialog(onReset, alert);
  }

  const isLoggedIn = userModel.isLoggedIn();

  const checkActivation = async () => {
    await loader.show('Please wait...');
    try {
      await userModel.checkActivation();
      if (!userModel.attrs.verified) {
        toast.warn('The user has not been activated or is blocked.');
      }
    } catch (err: any) {
      toast.error(err);
    }
    loader.hide();
  };

  const resendVerificationEmail = async () => {
    if (!device.isOnline) {
      toast.warn("Sorry, looks like you're offline.");
      return;
    }

    await loader.show('Please wait...');
    try {
      await userModel.resendVerificationEmail();
      toast.success(
        'A new verification email was successfully sent now. If you did not receive the email, then check your Spam or Junk email folders.'
      );
    } catch (err: any) {
      toast.error(err);
    }
    loader.hide();
  };

  return (
    <Page id="home-menu">
      <Main
        email={userModel.attrs.email}
        userName={userModel.attrs.fullName}
        isLoggedIn={isLoggedIn}
        isVerified={!!userModel.attrs.verified}
        logOut={logOut}
        refreshAccount={checkActivation}
        resendVerificationEmail={resendVerificationEmail}
      />
    </Page>
  );
};

export default observer(MenuController);
