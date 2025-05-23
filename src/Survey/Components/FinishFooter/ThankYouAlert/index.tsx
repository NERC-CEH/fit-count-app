import { checkmarkOutline } from 'ionicons/icons';
import { useTranslation, Trans as T } from 'react-i18next';
import { useDisableBackButton } from '@flumens';
import { IonItem, IonIcon, IonLabel } from '@ionic/react';
import appModel from 'models/app';
import Sample from 'models/sample';
import CustomAlert from '../../CustomAlert';
import './styles.scss';
import surveyStatistics from './surveyStatistics.json';

type Props = {
  sample: Sample;
  uploadSurvey: () => void;
  goHome: () => void;
};

const ThankYouAlert = (
  {
    sample,
    uploadSurvey,
    goHome
  }: Props
) => {
  const { country } = appModel.data;
  const isUK = country === 'UK';
  const isRestOfWorld = !isUK;

  useDisableBackButton();

  const { t } = useTranslation();

  const numberOfOccurrences = sample.getInsectCount();

  const englishFormat = Intl.DateTimeFormat('en', { month: 'long' });

  const englishMonth = englishFormat.format(new Date(sample.createdAt));

  const getAverageInsectCount = (month: any) => {
    const byMonth = (obj: any) => obj.month_name === month;

    const insectsData = surveyStatistics.find(byMonth);
    if (!insectsData) return null;

    return parseFloat(insectsData.average as any).toFixed(0);
  };
  const month = t(englishMonth);
  const averageInsectCountForThisMonth = getAverageInsectCount(month);

  return (
    <CustomAlert className="thank-you-alert">
      <div className="center">
        <IonIcon icon={checkmarkOutline} />
      </div>

      <h3>
        <T>
          Thanks for completing your FIT Count - all results help us to monitor
          insect populations.
        </T>
      </h3>

      {!!averageInsectCountForThisMonth && isUK && (
        <p>
          <T>
            You counted <b>{{ numberOfOccurrences } as any} </b>insect(s)
            altogether - the UK average for <b>{{ month } as any}</b> is{' '}
            <b>{{ averageInsectCountForThisMonth } as any}</b> insects per
            count.
          </T>
        </p>
      )}

      {isRestOfWorld && (
        <p>
          <T>
            You counted <b>{{ numberOfOccurrences } as any} </b>insect(s)
            altogether.
          </T>
        </p>
      )}

      <div className="button-wrapper">
        <IonItem
          color="secondary"
          onClick={uploadSurvey}
          className="next-button"
          lines="none"
        >
          <IonLabel>
            <T>Upload</T>
          </IonLabel>
        </IonItem>

        <IonItem
          color="medium"
          onClick={goHome}
          className="next-button home"
          lines="none"
        >
          <IonLabel>
            <T>Go Home</T>
          </IonLabel>
        </IonItem>
      </div>
    </CustomAlert>
  );
};

export default ThankYouAlert;
