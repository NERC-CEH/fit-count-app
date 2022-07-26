import { FC, useState } from 'react';
import { IonIcon, IonButton, IonList, IonRouterLink } from '@ionic/react';
import {
  personOutline,
  mailOutline,
  keyOutline,
  eyeOutline,
  eyeOffOutline,
  helpCircleOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { AnySchema } from 'yup';
import { Formik, Form } from 'formik';
import { Main, InputWithValidation, MenuAttrToggle } from '@flumens';
import getURLSpecificToLanguage from 'common/Components/getURLSpecificToLanguage';
import SelectWithValidation from './SelectWithValidation';

const optionsIdentificationExperience = [
  'I am new to identifying wildlife',
  'I am familiar with identifying some wildlife groups (e.g. birds or butterflies) but not most pollinating insects',
  'I am familiar with recognising the main groups of pollinating insect',
  'I am confident in identifying the commonly-occurring pollinating insects to species level',
  'Not stated',
];

type Props = {
  onSubmit: any;
  schema: AnySchema;
};

const RegisterMain: FC<Props> = ({ onSubmit, schema }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const registrationForm = ({
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    setFieldValue,
    isValid,
  }: any) => {
    const formikProps = {
      handleChange,
      handleBlur,
      errors,
      touched,
      values,
    };

    return (
      <Form>
        <IonList lines="full">
          <div className="rounded">
            <InputWithValidation
              name="fullName"
              placeholder="Full name"
              icon={personOutline}
              type="text"
              // autocomplete="off"
              {...formikProps}
            />
            <InputWithValidation
              name="email"
              placeholder="Email"
              icon={mailOutline}
              type="email"
              // autocomplete="off"
              {...formikProps}
            />
            <InputWithValidation
              name="password"
              placeholder="Password"
              icon={keyOutline}
              type={showPassword ? 'text' : 'password'}
              // autocomplete="off"
              {...formikProps}
            >
              <IonButton slot="end" onClick={togglePassword} fill="clear">
                <IonIcon
                  icon={showPassword ? eyeOutline : eyeOffOutline}
                  className="faint"
                  size="small"
                />
              </IonButton>
            </InputWithValidation>

            <SelectWithValidation
              icon={helpCircleOutline}
              placeholder="Identification experience"
              name="identificationExperience"
              options={optionsIdentificationExperience}
              interfaceProps={{
                cssClass: 'user-register-alert-styles',
              }}
              {...formikProps}
            />

            <MenuAttrToggle
              icon={mailOutline}
              label="Happy to be contacted"
              onChange={(val: boolean) =>
                setFieldValue('happyToBeContacted', val)
              }
              value={values.happyToBeContacted}
            />
          </div>

          <div className="terms-info-text">
            <T>
              By clicking Sign Up, you agree to our{' '}
              <IonRouterLink href={getURLSpecificToLanguage('privacy-notice')}>
                Privacy Policy
              </IonRouterLink>{' '}
              and{' '}
              <IonRouterLink href={getURLSpecificToLanguage('terms')}>
                Terms and Conditions
              </IonRouterLink>
            </T>
          </div>
        </IonList>

        {/** https://github.com/formium/formik/issues/1418 */}
        <input type="submit" style={{ display: 'none' }} />
        <IonButton
          color={isValid ? 'primary' : 'medium'}
          type="submit"
          expand="block"
        >
          <T>Sign Up</T>
        </IonButton>

        <div className="signin-button">
          <T>I am already a member</T>.{' '}
          <IonRouterLink routerLink="/user/login">
            <T>Sign In</T>
          </IonRouterLink>
        </div>
      </Form>
    );
  };

  return (
    <Main>
      <h1>
        <T>Create a free account</T>
      </h1>

      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
          fullName: '',
          email: '',
          identificationExperience: '',
          password: '',
          happyToBeContacted: false,
        }}
        validateOnMount
      >
        {registrationForm}
      </Formik>
    </Main>
  );
};

export default RegisterMain;
