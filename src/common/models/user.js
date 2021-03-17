/** ****************************************************************************
 * User model describing the user model on backend. Persistent.
 **************************************************************************** */
import Log from 'helpers/log';
import CONFIG from 'common/config';
import { DrupalUserModel, loader, toast } from '@apps';
import * as Yup from 'yup';
import i18n from 'i18next';
import { genericStore } from './store';

const { warn } = toast;

class UserModel extends DrupalUserModel {
  registerSchema = Yup.object().shape({
    email: Yup.string().email().required('Please fill in'),
    password: Yup.string().required('Please fill in'),
    fullName: Yup.string().required('Please fill in'),
    identificationExperience: Yup.string().required('Please fill in'),
  });

  resetSchema = Yup.object().shape({
    email: Yup.string().email().required('Please fill in'),
  });

  loginSchema = Yup.object().shape({
    email: Yup.string().required('Please fill in'),
    password: Yup.string().required('Please fill in'),
  });

  hasLogIn() {
    return !!this.attrs.email;
  }

  async checkActivation() {
    const isLoggedIn = !!this.attrs.id;
    if (!isLoggedIn) {
      warn(i18n.t('Please log in first.'));
      return false;
    }

    if (!this.attrs.verified) {
      await loader.show({
        message: i18n.t('Please wait...'),
      });

      try {
        await this.refreshProfile();
      } catch (e) {
        // do nothing
      }

      loader.hide();

      if (!this.attrs.verified) {
        warn(
          i18n.t("Sorry, your account hasn't been verified yet or is blocked.")
        );
        return false;
      }
    }

    return true;
  }
}

const defaults = {
  fullName: '',
};

Log('UserModel: initializing');
const userModel = new UserModel(genericStore, 'user', defaults, CONFIG.backend);
export { userModel as default, UserModel };
