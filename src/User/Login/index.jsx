import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { NavContext } from '@ionic/react';
import Log from 'helpers/log';
import { toast, loader, Page, Header, device } from '@flumens';
import { useTranslation } from 'react-i18next';
import Main from './Main';
import './styles.scss';

const { success, warn, error } = toast;

async function onLogin(userModel, details, onSuccess, t) {
  const { email, password } = details;

  if (!device.isOnline()) {
    warn("Sorry, looks like you're offline.");
    return;
  }

  await loader.show({
    message: t('Please wait...'),
  });

  try {
    await userModel.logIn(email.trim(), password);

    onSuccess();
  } catch (err) {
    Log(err, 'e');
    error(err.message);
  }

  loader.hide();
}

function LoginContainer({ userModel, onSuccess }) {
  const context = useContext(NavContext);

  const { t } = useTranslation();

  const onSuccessReturn = () => {
    onSuccess && onSuccess();

    success('Successfully logged in');
    context.navigate('/home/info', 'root');
  };

  const onLoginWrap = details =>
    onLogin(userModel, details, onSuccessReturn, t);

  return (
    <Page id="user-login">
      <Header className="ion-no-border" routerDirection="none" />
      <Main schema={userModel.loginSchema} onSubmit={onLoginWrap} />
    </Page>
  );
}

LoginContainer.propTypes = exact({
  userModel: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
});

export default LoginContainer;
