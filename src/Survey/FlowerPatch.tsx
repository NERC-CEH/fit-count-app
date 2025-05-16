import { useContext, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { locationOutline } from 'ionicons/icons';
import { Page, Attr, Main, InfoButton, InfoMessage } from '@flumens';
import { IonIcon, NavContext } from '@ionic/react';
import Footer from './Components/Footer';
import Header from './Components/Header';

// constants for page index and next page
const PAGE_INDEX = 6;
const NEXT_PAGE = 'insect-count';

// props type for FlowerPatch
type Props = {
  sample: any;
};

// functional component for FlowerPatch
const FlowerPatch = observer((props: Props) => {
  // get navigation context
  const navContext = useContext(NavContext);

  // destructure sample from props
  const { sample } = props;

  // handle value change for flower patch
  const handleValueChange = useCallback(
    (value: any): void => {
      // update sample data
      sample.data['flower-patch'] = value;
      sample.save();

      // navigate to next page after short delay
      const navigateToNextPage = () =>
        navContext.navigate(NEXT_PAGE, undefined, undefined, undefined, {
          unmount: true,
        });

      setTimeout(navigateToNextPage, 50);
    },
    [navContext, sample]
  );

  // check if the selected value is valid
  const isValueValid = useCallback((): boolean => {
    // check if flower-patch value exists
    return !!sample.data['flower-patch'];
  }, [sample]);

  // get survey config and attribute props
  const attrProps = useMemo(() => {
    // memoize attrProps for performance
    const surveyConfig = sample.getSurvey();
    return surveyConfig.attrs['flower-patch'].pageProps.attrProps;
  }, [sample]);

  return (
    <Page id="survey-flower-patch-page">
      <Header
        sample={sample}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Cover"
      />

      <Main>
        <InfoMessage
          prefix={<IonIcon src={locationOutline} className="size-6" />}
          color="tertiary"
          className="mb-3"
        >
          Is your 50x50cm patch of <b>target flowers</b> growing:
          <InfoButton label="READ MORE" header="Info" color="tertiary">
            <p>
              The surroundings of a flower patch can affect its attractiveness
              to insects.
            </p>
            <p>
              Please indicate the situation that best describes the area around
              your flower patch (roughly within 5 metres).
            </p>
          </InfoButton>
        </InfoMessage>

        <Attr
          attr="flower-patch"
          model={sample}
          {...attrProps}
          onChange={handleValueChange}
        />
      </Main>

      {isValueValid() && <Footer link={NEXT_PAGE} />}
    </Page>
  );
});

export default FlowerPatch;
