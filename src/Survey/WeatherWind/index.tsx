import { FC, useContext, useState } from 'react';
import { useTranslation, Trans as T } from 'react-i18next';
import { observer } from 'mobx-react';
import { Page, Attr, Main, InfoMessage, useToast } from '@flumens';
import appModel from 'models/app';
import { useUserStatusCheck } from 'models/user';
import Sample, { useValidateCheck } from 'models/sample';
import { NavContext, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { checkmarkOutline, informationCircleOutline } from 'ionicons/icons';
import surveyStatistics from './surveyStatistics.json';
import CustomAlert from '../Components/CustomAlert';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './styles.scss';

const PAGE_INDEX = 10;

type Props = {
  sample: Sample;
};

const WeatherWind: FC<Props> = ({ sample }) => {
  const { navigate } = useContext(NavContext);
  const { t } = useTranslation();
  const toast = useToast();
  const checkSampleStatus = useValidateCheck(sample);
  const checkUserStatus = useUserStatusCheck();

  const [showThanks, setShowThanks] = useState(false);

  const _processDraft = async () => {
    appModel.attrs['draftId:survey'] = '';
    await appModel.save();

    // eslint-disable-next-line no-param-reassign
    sample.metadata.saved = true;
    sample.save();
  };

  const goHome = () => navigate('/home/surveys', 'root');

  const uploadSurvey = async () => {
    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    const isValid = checkSampleStatus();
    if (!isValid) return;

    sample.upload().catch(toast.error);
    goHome();
  };

  const onFinish = async () => {
    if (!sample.metadata.saved) {
      await _processDraft();
    }

    setShowThanks(true);
  };

  const isValueValid = () => !!sample.attrs['weather-wind'];

  const getAverageInsectCount = (month: any) => {
    const byMonth = (obj: any) => obj.month_name === month;

    const insectsData = surveyStatistics.find(byMonth);
    if (!insectsData) return null;

    return parseFloat(insectsData.average as any).toFixed(0);
  };

  const { country } = appModel.attrs;
  const isUK = country === 'UK';
  const isRestOfWorld = !isUK;

  const surveyConfig = sample.getSurvey();
  const { attrProps } = surveyConfig.attrs['weather-wind'].pageProps;

  const numberOfOccurrences = sample.getInsectCount();

  const englishFormat = Intl.DateTimeFormat('en', { month: 'long' });

  const englishMonth = englishFormat.format(
    new Date(sample.metadata.created_on)
  );

  const month = t(englishMonth);

  const averageInsectCountForThisMonth = getAverageInsectCount(month);

  return (
    <Page id="survey-weather-wind-page">
      <Header surveyProgressIndex={PAGE_INDEX} backButtonLabel="Shade" />

      <Main>
        <InfoMessage icon={informationCircleOutline}>
          What was the <b>wind</b> strength?
        </InfoMessage>

        <Attr attr="weather-wind" model={sample} {...attrProps} />
      </Main>

      {isValueValid() && <Footer title="Save my count" onClick={onFinish} />}

      {showThanks && (
        <CustomAlert>
          <div className="center">
            <IonIcon icon={checkmarkOutline} />
          </div>

          <h3>
            <T>
              Thanks for completing your FIT Count - all results help us to
              monitor insect populations.
            </T>
          </h3>

          {!!averageInsectCountForThisMonth && isUK && (
            <p>
              <T>
                You counted <b>{{ numberOfOccurrences }} </b>insect(s)
                altogether - the UK average for <b>{{ month }}</b> is{' '}
                <b>{{ averageInsectCountForThisMonth }}</b> insects per count.
              </T>
            </p>
          )}

          {isRestOfWorld && (
            <p>
              <T>
                You counted <b>{{ numberOfOccurrences }} </b>insect(s)
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
      )}
    </Page>
  );
};

export default observer(WeatherWind);
