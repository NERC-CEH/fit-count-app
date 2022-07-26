import { FC } from 'react';
import { JSX } from '@ionic/core';
import { IonIcon, IonItem, IonSelectOption, IonSelect } from '@ionic/react';
import { Trans as T, useTranslation } from 'react-i18next';
import { informationCircleOutline } from 'ionicons/icons';
import clsx from 'clsx';
import './styles.scss';

type Props = JSX.IonSelect & {
  /**
   * The name of the control, which is submitted with the form data.
   */
  name: string;
  /**
   * Function to invoke on value change.
   */
  handleChange: () => any;
  /**
   * Emitted when the select loses focus.
   */
  // handleBlur: () => {};
  /**
   * Form errors.
   */
  errors: any;
  /**
   * Is the input touched.
   */
  touched: any;
  /**
   * Select option values.
   */
  options: any;
  /**
   * The current selected value.
   */
  values: any;
  /**
   * The text to display when the select is empty.
   */
  placeholder?: string;
  /**
   * Class name to the whole select input wrapper.
   */
  className?: string;
  /**
   * Icon to use.
   */
  icon?: string;
  /**
   * Custom alert properties.
   */
  interfaceProps?: any;
};

const SelectWithValidation: FC<Props> = ({
  icon,
  placeholder,
  handleChange,
  // handleBlur,
  name,
  errors,
  options,
  touched,
  values,
  className,
  interfaceProps,
}) => {
  const { t } = useTranslation();

  const getOptions = () => {
    const getOption = (option: any, index: number) => {
      return (
        <IonSelectOption key={index} value={option}>
          <T>{option}</T>
        </IonSelectOption>
      );
    };

    return options.map(getOption);
  };

  const error = errors[name] && touched[name];
  console.log(errors, touched);

  const userRegistrationAlertStyles = {
    header: t('Select'),
    ...interfaceProps,
  };

  return (
    <>
      <IonItem
        className={clsx('select-with-validation', error && 'error', className)}
      >
        <IonIcon icon={icon} size="small" slot="start" />
        <IonSelect
          value={values[name]}
          interfaceOptions={userRegistrationAlertStyles}
          interface="alert"
          cancelText={t('Cancel')}
          okText={t('Done')}
          placeholder={t(placeholder || '')}
          onIonChange={handleChange}
          // onIonBlur={handleBlur}
          name={name}
        >
          {getOptions()}
        </IonSelect>
      </IonItem>

      {error && (
        <div className="error-container">
          <div className="error-message">
            <IonIcon icon={informationCircleOutline} />
            <span>
              <T>{errors[name]}</T>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectWithValidation;
