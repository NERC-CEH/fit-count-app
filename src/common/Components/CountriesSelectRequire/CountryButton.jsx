import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Trans as T } from 'react-i18next';
import { IonItem, IonLabel } from '@ionic/react';
import './styles.scss';

function CountryButton({ appModel, country }) {
  const { flag, label, value } = country;

  const selectCountry = () => {
    appModel.attrs.country = value; // eslint-disable-line no-param-reassign
    appModel.save();
  };

  return (
    <IonItem
      key={label}
      lines="none"
      className="country-list-item"
      onClick={selectCountry}
      detail
    >
      <img className="country-icons" src={flag} />

      <IonLabel>
        <div className="country-label">
          <h3>
            <T>{label}</T>
          </h3>
        </div>
      </IonLabel>
    </IonItem>
  );
}

CountryButton.propTypes = exact({
  country: PropTypes.object.isRequired,
  appModel: PropTypes.object.isRequired,
});

export default CountryButton;
