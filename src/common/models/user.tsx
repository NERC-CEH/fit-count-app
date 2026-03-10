/** ****************************************************************************
 * User model describing the user model on backend. Persistent.
 **************************************************************************** */
import { useContext } from 'react';
import { z, object } from 'zod';
import {
  DrupalUserModel,
  device,
  useToast,
  useLoader,
  useAlert,
  DrupalUserModelAttrs,
} from '@flumens';
import { NavContext } from '@ionic/react';
import { setUser } from '@sentry/browser';
import CONFIG from 'common/config';
import appModel from './app';
import { mainStore } from './store';

export type Attrs = {
  fullName: string;
  email: string;
  fieldIndiciaCountry?: string;
} & DrupalUserModelAttrs;

const defaults: Attrs = {
  fullName: '',
  email: '',
};

export class UserModel extends DrupalUserModel<Attrs> {
  static registerSchema: any = object({
    email: z.string().email('Please fill in'),
    password: z.string().min(1, 'Please fill in'),
    fullName: z.string().min(1, 'Please fill in'),
    identificationExperience: z
      .string({ error: 'Please fill in' })
      .min(1, 'Please fill in'),
    fieldIndiciaCountry: z.string().min(1, 'Please fill in').optional(), // optional because it's auto-filled based on appModel's country
  });

  static resetSchema: any = object({
    email: z.string().email('Please fill in'),
  });

  static loginSchema: any = object({
    email: z.string().email('Please fill in'),
    password: z.string().min(1, 'Please fill in'),
  });

  constructor(options: any) {
    super({ ...options, data: { ...defaults, ...options.data } });

    const checkForValidation = () => {
      if (this.isLoggedIn() && !this.data.verified) {
        console.log('User: refreshing profile for validation');
        this.refreshProfile();
      }
    };
    this.ready?.then(checkForValidation);

    // migrate existing users' country setting to the website
    // TODO: remove this after a year when most users have the setting filled
    this.ready
      ?.then(() => {
        if (this.data.fieldIndiciaCountry || !appModel.data.country)
          return null;
        return this.updateUserCountrySetting(appModel.data.country);
      })
      .catch(() => {});
  }

  async updateUserCountrySetting(country: string) {
    const userReady =
      this.isLoggedIn() && this.data.verified && this.data.profileFetched;

    if (!device.isOnline) return;
    if (!userReady) return;

    const originalValue = this.data.fieldIndiciaCountry;

    try {
      const fieldIndiciaCountry = country.toLocaleLowerCase();
      this.data.fieldIndiciaCountry = fieldIndiciaCountry;

      await this.updateRemote({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        field_indicia_country: [{ value: fieldIndiciaCountry }],
      });
    } catch (error: any) {
      this.data.fieldIndiciaCountry = originalValue;
      throw error;
    }
  }

  async logIn(email: string, password: string) {
    await super.logIn(email, password);

    if (this.id) setUser({ id: this.id });

    try {
      if (this.data.fieldIndiciaCountry || !appModel.data.country) return;
      this.updateUserCountrySetting(appModel.data.country);
    } catch (error) {
      // do nothing
    }
  }

  async checkActivation() {
    if (!this.isLoggedIn()) return false;

    if (!this.data.verified) {
      try {
        await this.refreshProfile();
      } catch (e) {
        // do nothing
      }

      if (!this.data.verified) return false;
    }

    return true;
  }

  async resendVerificationEmail() {
    if (!this.isLoggedIn() || this.data.verified) return false;

    await this._sendVerificationEmail();

    return true;
  }

  resetDefaults() {
    return super.reset(defaults);
  }
}

const userModel = new UserModel({
  cid: 'user',
  store: mainStore,
  config: CONFIG.backend,
});

export const useUserStatusCheck = () => {
  const { navigate } = useContext(NavContext);
  const toast = useToast();
  const loader = useLoader();
  const alert = useAlert();

  const check = async () => {
    if (!device.isOnline) {
      toast.warn('Looks like you are offline!');
      return false;
    }

    if (!userModel.isLoggedIn()) {
      navigate('/user/login');
      return false;
    }

    if (!userModel.data.verified) {
      await loader.show('Please wait...');
      const isVerified = await userModel.checkActivation();
      loader.hide();

      if (!isVerified) {
        const resendVerificationEmail = async () => {
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

        alert({
          header: "Looks like your email hasn't been verified yet.",
          message: 'Should we resend the verification email?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Resend',
              handler: resendVerificationEmail,
            },
          ],
        });

        return false;
      }
    }

    return true;
  };

  return check;
};

(window as any).userModel = userModel;

export default userModel;
