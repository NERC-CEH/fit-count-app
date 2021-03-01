/** ****************************************************************************
 * User model describing the user model on backend. Persistent.
 **************************************************************************** */
import Log from 'helpers/log';
import CONFIG from 'common/config';
import { DrupalUserModel } from '@apps';
import * as Yup from 'yup';
import { genericStore } from './store';

class UserModel extends DrupalUserModel {
  registerSchema = Yup.object().shape({
    email: Yup.string().email().required('Please fill in'),
    password: Yup.string().required('Please fill in'),
    fullName: Yup.string().required('Please fill in'),
    heardFrom: Yup.string().required('Please fill in'),
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
}

const defaults = {
  fullName: '',
};

Log('UserModel: initializing');
const userModel = new UserModel(genericStore, 'user', defaults, CONFIG.backend);
export { userModel as default, UserModel };
