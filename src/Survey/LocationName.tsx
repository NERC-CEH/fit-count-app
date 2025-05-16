import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Page, Attr, Main, InfoMessage } from '@flumens';
import { IonIcon } from '@ionic/react';
import Sample from 'models/sample';
import Footer from './Components/Footer';
import Header from './Components/Header';
import RequiredLabel from './Components/RequiredLabel';

const PAGE_INDEX = 2;

const NEXT_PAGE = 'habitat';

type Props = {
  sample: Sample;
};

const LocationName = ({ sample }: Props) => {
  const isValueValid = () => !!sample.data['location-name'];

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
        <InfoMessage
          prefix={<IonIcon src={informationCircleOutline} className="size-6" />}
        >
          Enter your survey location name.
        </InfoMessage>

        <h3 className="list-title">
          <div>
            <T>Location name</T>
            {isMissing && <RequiredLabel />}:
          </div>
        </h3>

        <Attr attr="location-name" model={sample} {...attrProps} />
      </Main>

      {isValueValid() && <Footer link={NEXT_PAGE} />}
    </Page>
  );
};

export default observer(LocationName);
