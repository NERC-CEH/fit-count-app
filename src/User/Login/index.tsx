import { FC, useContext } from 'react';
import { UserModel } from 'models/user';
import { NavContext } from '@ionic/react';
import { useToast, useLoader, Page, Header, device } from '@flumens';
import Main from './Main';
import './styles.scss';

export type Details = {
  password: string;
  email: string;
};

type Props = {
  userModel: UserModel;
};

const LoginController: FC<Props> = ({ userModel }) => {
  const context = useContext(NavContext);
  const toast = useToast();
  const loader = useLoader();

  const onSuccessReturn = () => {
    toast.success('Successfully logged in');
    context.navigate('/home/surveys', 'root');
  };

  async function onLogin(details: Details) {
    const { email, password } = details;

    if (!device.isOnline) {
      toast.warn("Sorry, looks like you're offline.");
      return;
    }

    await loader.show('Please wait...');

    try {
      await userModel.logIn(email.trim(), password);

      onSuccessReturn();
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();
  }

  return (
    <Page id="user-login">
      <Header className="ion-no-border" />
      <Main schema={userModel.loginSchema} onSubmit={onLogin} />
    </Page>
  );
};

export default LoginController;