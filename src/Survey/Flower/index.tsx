import { useRef, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import {
  Page,
  Attr,
  Main,
  MenuAttrItemFromModel,
  InfoMessage,
  InfoButton,
} from '@flumens';
import { IonIcon } from '@ionic/react';
import PhotoPicker from 'Components/PhotoPicker';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RequiredLabel from '../Components/RequiredLabel';
import './images';
import './styles.scss';

// constants for page index and next page
const PAGE_INDEX = 3;
const NEXT_PAGE = 'flower-count';

// props type for Flower
export type Props = {
  sample: any;
};

// functional component for Flower
const Flower = observer((props: Props) => {
  // destructure props
  const { sample } = props;

  // ref for scrolling
  const contentRef = useRef<any>(null);

  // set flower type based on selected flower name
  const setFlowerType = useCallback(
    (selectedFlowerName: string): void => {
      // get flower options from survey config
      const surveyConfig = sample.getSurvey();
      const flowersOptions =
        surveyConfig.attrs.flower.pageProps.attrProps.inputProps().options;
      const byFlowerName = (flower: any) => flower.value === selectedFlowerName;
      const flower = flowersOptions.find(byFlowerName);

      // edge case: flower may be undefined
      sample.data['flower-count'] = flower ? flower.type : undefined;
      sample.save();
    },
    [sample]
  );

  // handle value change for flower selection
  const handleValueChange = useCallback(
    (value: string): void => {
      // update selected flower
      sample.data.flower = value;

      setFlowerType(value);

      // edge case: scroll to bottom if 'Other' is selected
      if (sample.data.flower === 'Other') {
        if (contentRef.current) {
          contentRef.current.scrollToBottom(500);
        }
        return;
      }

      // clear manual entry if not 'Other'
      sample.data['flower-manual-entry'] = null;
      sample.save();
    },
    [sample]
  );

  // render manual entry input if 'Other' is selected
  const getManualEntry = useCallback(() => {
    const value = sample.data.flower;
    const isMissing = !sample.data['flower-manual-entry'];

    if (value === 'Other') {
      return (
        <div className="record-manual-entry-wrapper">
          <h3 className="list-title pl-3">
            <div>
              <T>Please add the name of the flower</T>{' '}
              {isMissing && <RequiredLabel />}
            </div>
          </h3>

          <MenuAttrItemFromModel model={sample} attr="flower-manual-entry" />
        </div>
      );
    }

    return null;
  }, [sample]);

  // check if the selected value and photo are valid
  const isValueValid = useCallback((): boolean => {
    const { flower } = sample.data;
    const flowerManualEntry = sample.data['flower-manual-entry'];
    const hasSpeciesSet = flower !== 'Other' ? !!flower : !!flowerManualEntry;
    const hasPhoto = !!sample.media.length;
    return hasSpeciesSet && hasPhoto;
  }, [sample]);

  // get survey config and attribute props
  const attrProps = useMemo(() => {
    const surveyConfig = sample.getSurvey();
    return surveyConfig.attrs.flower.pageProps.attrProps;
  }, [sample]);

  // get values for rendering
  const value = sample.data.flower;
  const flowerManualEntry = sample.data['flower-manual-entry'];
  const isMissingFlower = value !== 'Other' ? !!value : !!flowerManualEntry;
  const isMissingPhoto = !sample.media.length;

  // render component
  return (
    <Page id="survey-flower-page">
      <Header
        sample={sample}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Habitat"
      />

      <Main ref={contentRef}>
        <InfoMessage
          prefix={<IonIcon src={informationCircleOutline} className="size-6" />}
          color="tertiary"
          className="mb-3"
        >
          Which target <b>flower</b> have you chosen?
          <InfoButton label="READ MORE" header="Info" color="tertiary">
            <p>
              Where possible please choose a patch of flowers from one of the
              target flower groups in the list.
            </p>
            <p>
              If none of these is available at your location you can choose
              another flower that is attracting insects and select “Other”, then
              type in the name.
            </p>
            <p>
              Your target flower can be growing in a patch all of the same
              flower, or among different flower species.
            </p>
            <p>
              For each FIT Count, please upload one or two photos of your target
              flower.
            </p>
            <p>
              This allows us to double-check the flower species used for the
              counts.
            </p>
          </InfoButton>
        </InfoMessage>

        <h3 className="list-title pl-3">
          <div>
            <T>Photo of your target flower</T>{' '}
            {isMissingPhoto && <RequiredLabel />}
          </div>
        </h3>
        <PhotoPicker value={sample.media} model={sample} />

        <h3 className="list-title pl-3">
          <div>
            <T>Target flower chosen</T> {!isMissingFlower && <RequiredLabel />}
          </div>
        </h3>
        <Attr
          attr="flower"
          model={sample}
          onChange={handleValueChange}
          {...attrProps}
        />

        {getManualEntry()}
      </Main>

      {isValueValid() && <Footer link={NEXT_PAGE} />}
    </Page>
  );
});

export default Flower;
