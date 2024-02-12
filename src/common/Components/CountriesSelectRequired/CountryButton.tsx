import { Trans as T } from 'react-i18next';
import { IonItem, IonLabel } from '@ionic/react';
import './styles.scss';

type Props = {
  country: any;
  onClick: any;
};

function CountryButton({ country, onClick }: Props) {
  const { flag, label } = country;

  return (
    <IonItem
      key={label}
      lines="none"
      className="country-list-item"
      onClick={onClick}
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

export default CountryButton;
