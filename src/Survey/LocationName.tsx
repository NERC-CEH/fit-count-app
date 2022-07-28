import { FC } from 'react';
import { observer } from 'mobx-react';
import { Page, Attr, Main, InfoMessage } from '@flumens';
import { informationCircleOutline } from 'ionicons/icons';
import { IonItemDivider } from '@ionic/react';
import Sample from 'models/sample';
import { Trans as T } from 'react-i18next';
import Header from './Components/Header';
import Footer from './Components/Footer';
import RequiredLabel from './Components/RequiredLabel';

const PAGE_INDEX = 2;

const NEXT_PAGE = 'habitat';

type Props = {
  sample: Sample;
};

const LocationName: FC<Props> = ({ sample }) => {
  const isValueValid = () => !!sample.attrs['location-name'];

  const surveyConfig = sample.getSurvey();
  const { attrProps } = surveyConfig.attrs['location-name'].pageProps;

  const isMissing = !isValueValid();

  return (
    <Page id="survey-location-name-page">
      <Header
        sample={sample}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Location"
      />

      <Main>
        <InfoMessage icon={informationCircleOutline}>
          Enter your survey location name.
        </InfoMessage>

        <IonItemDivider mode="ios" className="survey-divider">
          <div>
            <T>Location name</T>
            {isMissing && <RequiredLabel />}:
          </div>
        </IonItemDivider>

        <Attr attr="location-name" model={sample} {...attrProps} />
      </Main>

      {isValueValid() && <Footer link={NEXT_PAGE} />}
    </Page>
  );
};

export default observer(LocationName);
