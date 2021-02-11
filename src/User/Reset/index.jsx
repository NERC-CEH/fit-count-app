import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { NavContext } from '@ionic/react';
import { Trans as T, useTranslation } from 'react-i18next';
import { Page, Header, device, alert, loader, toast } from '@apps';
import Main from './Main';
import './styles.scss';

const { warn, error } = toast;

async function onSubmit(userModel, details, onSuccess, t) {
  const { email } = details;

  if (!device.isOnline()) {
    warn("Sorry, looks like you're offline.");
    return;
  }

  await loader.show({
    message: t('Please wait...'),
  });

  try {
    await userModel.reset(email.trim());

    alert({
      header: "We've sent an email to you",
      message: (
        <T>
          Click the link in the email to reset your password. If you don't see
          the email, check other places like your junk, spam or other folders.
        </T>
      ),
      buttons: [
        {
          text: 'OK, got it',
          role: 'cancel',
          handler: onSuccess,
        },
      ],
    });
  } catch (err) {
    console.error(err, 'e');
    error(err.message);
  }

  loader.hide();
}

export default function ResetContainer({ userModel }) {
  const context = useContext(NavContext);

  const { t } = useTranslation();

  const onSuccess = () => {
    context.navigate('/home/info', 'root');
  };

  const onSubmitWrap = details => onSubmit(userModel, details, onSuccess, t);

  return (
    <Page id="user-reset">
      <Header
        className="ion-no-border"
        routerDirection="none"
        defaultHref="/user/login"
      />
      <Main schema={userModel.resetSchema} onSubmit={onSubmitWrap} />
    </Page>
  );
}

ResetContainer.propTypes = exact({
  userModel: PropTypes.object.isRequired,
});
