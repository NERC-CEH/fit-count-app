import { stopwatchOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import CustomAlert from '../../Components/CustomAlert';

// props type for IntroAlert
export type Props = {
  onContinue: () => void;
};

// functional component for IntroAlert
const IntroAlert = ({ onContinue }: Props) => {
  // handle continue button click
  const handleContinue = () => {
    onContinue();
  };

  return (
    <CustomAlert>
      <div className="center">
        <IonIcon icon={stopwatchOutline} />
      </div>

      <p>
        <T>The timer will now start!</T>
      </p>

      <ul>
        <li>
          <T>
            Count every insect that lands on the target flowers (count each
            individual once).
          </T>
        </li>
        <li>
          <T>
            Tap the insect images to increase your count (minus buttons will
            decrease the count)
          </T>
        </li>
        <li>
          <T>
            If you don't know which insect group, add to the "Other insects"
            category.
          </T>
        </li>
      </ul>

      <div>
        <IonItem onClick={handleContinue} className="next-button" lines="none">
          <IonLabel>
            <T>Start Count</T>
          </IonLabel>
        </IonItem>
      </div>
    </CustomAlert>
  );
};

export default IntroAlert;
