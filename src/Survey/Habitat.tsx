/* eslint-disable no-param-reassign */
import { useRef, useContext, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import {
  Page,
  Attr,
  Main,
  InfoMessage,
  InfoButton,
  MenuAttrItemFromModel,
} from '@flumens';
import { NavContext, IonIcon } from '@ionic/react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import RequiredLabel from './Components/RequiredLabel';

const PAGE_INDEX = 2;
const NEXT_PAGE = 'flower';

interface Props {
  sample: any;
}

const Habitat = observer(({ sample }: Props) => {
  const navContext = useContext(NavContext);
  const contentRef = useRef<any>(null);

  const handleValueChange = useCallback(
    (value: any) => {
      sample.data.habitat = value;

      if (sample.data.habitat === 'Other') {
        return;
      }

      sample.data['habitat-manual-entry'] = null;
      sample.save();

      if (sample.data.habitat !== 'Other') {
        const navigateToNextPage = () =>
          navContext.navigate(NEXT_PAGE, undefined, undefined, undefined, {
            unmount: true,
          });

        setTimeout(navigateToNextPage, 50);
      }
    },
    [navContext, sample]
  );

  const renderManualEntry = useCallback(() => {
    const habitatValue = sample.data.habitat;
    const isMissing = !sample.data['habitat-manual-entry'];

    if (habitatValue === 'Other') {
      return (
        <div className="record-manual-entry-wrapper">
          <h3 className="list-title">
            <div>
              <T>Other</T> {isMissing && <RequiredLabel />}
            </div>
          </h3>

          <MenuAttrItemFromModel
            model={sample}
            attr="habitat-manual-entry"
            skipValueTranslation
          />
        </div>
      );
    }

    return null;
  }, [sample]);

  const isValueValid = useCallback(() => {
    const { habitat } = sample.data;
    const habitatManualEntry = sample.data['habitat-manual-entry'];

    const hasHabitat = habitat !== 'Other' ? !!habitat : !!habitatManualEntry;

    return hasHabitat;
  }, [sample]);

  useEffect(() => {
    if (sample.data.habitat === 'Other' && contentRef.current) {
      contentRef.current.scrollToBottom(500);
    }
  }, [sample.data.habitat]);

  const surveyConfig = sample.getSurvey();
  const { attrProps } = surveyConfig.attrs.habitat.pageProps;

  return (
    <Page id="survey-habitat-page">
      <Header
        sample={sample}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Location"
      />

      <Main ref={contentRef}>
        <InfoMessage
          prefix={<IonIcon src={informationCircleOutline} className="size-6" />}
          color="tertiary"
          className="mb-3"
        >
          Select one <b>habitat</b> that is the best match.
          <InfoButton label="READ MORE" header="Info" color="tertiary">
            <p>
              Select the habitat that best describes the 50x50 cm patch chosen
              for your count.
            </p>
            <p>
              If not listed here, please select “Other” and type in a short
              description of the habitat.
            </p>
          </InfoButton>
        </InfoMessage>

        <Attr
          attr="habitat"
          model={sample}
          {...attrProps}
          onChange={handleValueChange}
        />

        {renderManualEntry()}
      </Main>

      {isValueValid() && <Footer link={NEXT_PAGE} />}
    </Page>
  );
});

export default Habitat;
