import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { NavContext } from '@ionic/react';
import { Trans as T, useTranslation } from 'react-i18next';
import { Page, device, toast, alert, loader, Header } from '@apps';
import Main from './Main';
import './styles.scss';

const { warn, error } = toast;

async function onRegister(userModel, details, onSuccess, t) {
  const {
    fullName,
    password,
    happyToBeContacted,
    identificationExperience,
  } = details;

  const email = details.email.trim();

  const otherDetails = {
    field_full_name: [{ value: fullName.trim() }],
    field_identification_experience: [{ value: identificationExperience }],
    field_happy_to_be_contacted: [{ value: happyToBeContacted }],
  };

  if (!device.isOnline()) {
    warn("Sorry, looks like you're offline.");
    return;
  }

  await loader.show({
    message: t('Please wait...'),
  });

  try {
    await userModel.register(email, password, otherDetails);

    userModel.attrs.fullName = fullName; // eslint-disable-line
    userModel.save();

    alert({
      header: 'Welcome aboard',
      message: (
        <>
          <T>
            Before starting any surveys please check your email and click on the
            verification link.
          </T>
        </>
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

export default function RegisterContainer({ userModel }) {
  const context = useContext(NavContext);
  const { t } = useTranslation();

  const onSuccess = () => {
    context.navigate('/home/info', 'root');
  };

  const onRegisterWrap = details =>
    onRegister(userModel, details, onSuccess, t);

  return (
    <Page id="user-register">
      <Header className="ion-no-border" routerDirection="none" />
      <Main schema={userModel.registerSchema} onSubmit={onRegisterWrap} />
    </Page>
  );
}

RegisterContainer.propTypes = exact({
  userModel: PropTypes.object.isRequired,
});
