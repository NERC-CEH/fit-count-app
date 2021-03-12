import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
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
import { Formik, Form } from 'formik';
import {
  Main,
  InputWithValidation,
  ToggleWithValidation,
  SelectWithValidation,
} from '@apps';
import config from 'common/config';

const optionsIdentificationExperience = [
  'I am new to identifying wildlife',
  'I am familiar with identifying some wildlife groups (e.g. birds or butterflies) but not most pollinating insects',
  'I am familiar with recognising the main groups of pollinating insect',
  'I am confident in identifying the commonly-occurring pollinating insects to species level',
  'Not stated',
];

class Component extends React.Component {
  state = {
    showPassword: false,
  };

  togglePassword = () => {
    const invertPasswordShow = prevState => ({
      showPassword: !prevState.showPassword,
    });
    this.setState(invertPasswordShow);
  };

  render() {
    const { showPassword } = this.state;
    const { onSubmit, schema } = this.props;

    const registrationForm = ({
      handleChange,
      handleBlur,
      errors,
      touched,
      values,
      setFieldValue,
    }) => {
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
            <InputWithValidation
              name="fullName"
              placeholder="Full name"
              icon={personOutline}
              type="text"
              autocomplete="off"
              {...formikProps}
            />

            <InputWithValidation
              name="email"
              placeholder="Email"
              icon={mailOutline}
              type="email"
              autocomplete="off"
              {...formikProps}
            />

            <InputWithValidation
              name="password"
              placeholder="Password"
              icon={keyOutline}
              type={showPassword ? 'text' : 'password'}
              autocomplete="off"
              {...formikProps}
            >
              <IonButton slot="end" onClick={this.togglePassword} fill="clear">
                <IonIcon
                  icon={showPassword ? eyeOutline : eyeOffOutline}
                  faint
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

            <ToggleWithValidation
              name="happyToBeContacted"
              icon={mailOutline}
              label="Happy to be contacted"
              id="test"
              setFieldValue={setFieldValue}
              {...formikProps}
            />

            <div className="terms-info-text">
              <T>
                By clicking Sign Up, you agree to our{' '}
                <IonRouterLink href={`${config.backend.url}/privacy-notice`}>
                  Privacy Policy
                </IonRouterLink>{' '}
                and{' '}
                <IonRouterLink href={`${config.backend.url}/terms_of_use`}>
                  Terms and Conditions
                </IonRouterLink>
              </T>
            </div>
          </IonList>

          <IonButton color="primary" type="submit" expand="block">
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
          initialValues={{ happyToBeContacted: false }}
        >
          {registrationForm}
        </Formik>
      </Main>
    );
  }
}

Component.propTypes = exact({
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
});

export default Component;
