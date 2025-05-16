import { useContext, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import { Page, Main, Attr, InfoMessage, InfoButton } from '@flumens';
import { IonIcon, NavContext } from '@ionic/react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import './styles.scss';

// constant for page index
const PAGE_INDEX = 5;

// constant for next page
const NEXT_PAGE = 'flower-patch';

// props type for FlowerCover
export type Props = {
  sample: any;
};

// functional component for FlowerCover
const FlowerCover = observer((props: Props) => {
  // get navigation context
  const navContext = useContext(NavContext);

  // destructure sample from props
  const { sample } = props;

  // handle value change for flower cover
  const onValueChange = useCallback(
    (value: any): void => {
      // update flower-cover in sample data
      sample.data['flower-cover'] = value;
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

  // check if value is valid
  const isValueValid = useCallback((): boolean => {
    // check if flower-cover value exists
    return !!sample.data['flower-cover'];
  }, [sample]);

  // get survey config and attribute props
  const attrProps = useMemo(() => {
    const surveyConfig = sample.getSurvey();
    return surveyConfig.attrs['flower-cover'].pageProps.attrProps;
  }, [sample]);

  // render component
  return (
    <Page id="survey-flower-cover-page">
      <Header
        sample={sample}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Count"
      />

      <Main>
        <InfoMessage
          prefix={<IonIcon src={informationCircleOutline} className="size-6" />}
          color="tertiary"
          className="mb-3"
        >
          What is the target <b>flower cover</b> in your 50x50 cm patch?
          <InfoButton label="READ MORE" header="Info" color="tertiary">
            <p>
              Estimate how much of your 50×50 cm patch is occupied by the target
              flowers (but not by the leaves of the target plant).
            </p>
          </InfoButton>
        </InfoMessage>

        <Attr
          attr="flower-cover"
          model={sample}
          {...attrProps}
          onChange={onValueChange}
        />
      </Main>

      {isValueValid() && <Footer link={NEXT_PAGE} />}
    </Page>
  );
});

export default FlowerCover;
