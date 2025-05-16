import { useContext } from 'react';
import { Trans as T } from 'react-i18next';
import { TypeOf } from 'zod';
import { Page, Header, device, useToast, useAlert, useLoader } from '@flumens';
import { NavContext } from '@ionic/react';
import userModel, { UserModel } from 'models/user';
import Main from './Main';

type Details = TypeOf<typeof UserModel.registerSchema>;

const RegisterContainer = () => {
  const context = useContext(NavContext);
  const alert = useAlert();
  const toast = useToast();
  const loader = useLoader();

  const onSuccess = () => {
    context.navigate('/home/info', 'root');
  };

  async function onRegister(details: Details) {
    const email = details.email.trim();
    const { password, fullName, happyToBeContacted, identificationExperience } =
      details;

    const otherDetails = {
      field_full_name: [{ value: fullName.trim() }],
      field_identification_experience: [{ value: identificationExperience }],
      field_happy_to_be_contacted: [{ value: happyToBeContacted }],
    };

    if (!device.isOnline) {
      toast.warn("Sorry, looks like you're offline.");
      return;
    }
    await loader.show('Please wait...');

    try {
      await userModel.register(email, password, otherDetails);

      userModel.data.fullName = fullName; // eslint-disable-line
      userModel.save();

      alert({
        header: 'Welcome aboard',
        message: (
          <T>
            Before starting any surveys please check your email and click on the
            verification link.
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
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();
  }

  return (
    <Page id="user-register">
      <Header />
      <Main onSubmit={onRegister} />
    </Page>
  );
};

export default RegisterContainer;
