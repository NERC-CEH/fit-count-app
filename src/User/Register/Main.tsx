import { useState } from 'react';
import clsx from 'clsx';
import {
  keyOutline,
  personOutline,
  eyeOutline,
  eyeOffOutline,
  mailOutline,
  helpCircleOutline,
} from 'ionicons/icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Trans as T } from 'react-i18next';
import { TypeOf } from 'zod';
import { Main, Button, Toggle, Select, Input } from '@flumens';
import { zodResolver } from '@hookform/resolvers/zod';
import { IonIcon, IonRouterLink } from '@ionic/react';
import config from 'common/config';
import { UserModel } from 'models/user';

type Details = TypeOf<typeof UserModel.registerSchema>;

type Props = {
  onSubmit: SubmitHandler<Details>;
};

const optionsIdentificationExperience = [
  { value: 'I am new to identifying wildlife' },
  {
    value:
      'I am familiar with identifying some wildlife groups (e.g. birds or butterflies) but not most pollinating insects',
  },
  {
    value:
      'I am familiar with recognising the main groups of pollinating insect',
  },
  {
    value:
      'I am confident in identifying the commonly-occurring pollinating insects to species level',
  },
  { value: 'Not stated' },
];

const RegisterMain = ({ onSubmit }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const { formState, handleSubmit, control, setValue, getValues } =
    useForm<Details>({
      defaultValues: {
        fullName: '',
        email: '',
        password: '',
        happyToBeContacted: null,
        identificationExperience: null,
      },
      resolver: zodResolver(UserModel.registerSchema),
    });

  return (
    <Main>
      <div className="mx-auto max-w-md px-3">
        <h1 className="my-10 text-center">
          <T>Create a free account</T>
        </h1>

        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          {/* Fake onSubmit on Enter */}
          <input type="submit" className="hidden" />

          <div className="rounded-list">
            <Input.Form
              control={control}
              name="fullName"
              prefix={<IonIcon icon={personOutline} className="size-5" />}
              placeholder="Full name"
            />

            <Input.Form
              control={control}
              name="email"
              prefix={<IonIcon icon={mailOutline} className="size-5" />}
              type="email"
              placeholder="Email"
            />
            <Input.Form
              control={control}
              name="password"
              prefix={<IonIcon icon={keyOutline} className="size-5" />}
              suffix={
                <IonIcon
                  icon={showPassword ? eyeOutline : eyeOffOutline}
                  className="size-5 opacity-50"
                  onClick={togglePassword}
                />
              }
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />

            <Select.Form
              control={control}
              prefix={<IonIcon src={helpCircleOutline} className="size-6" />}
              placeholder="Identification experience"
              name="identificationExperience"
              options={optionsIdentificationExperience}
            />

            <Toggle
              prefix={<IonIcon src={mailOutline} className="size-6" />}
              label="Happy to be contacted"
              onChange={(val: boolean) => setValue('happyToBeContacted', val)}
              defaultSelected={getValues('happyToBeContacted')}
            />
          </div>

          <div className="my-6 px-5 text-base">
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

          <Button
            className={clsx(
              'mx-auto mt-10',
              !formState.isValid && 'opacity-50'
            )}
            color="primary"
            onPress={() => handleSubmit(onSubmit)()}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Main>
  );
};

export default RegisterMain;
