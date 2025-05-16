import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Page, Attr, Main, InfoMessage, InfoButton } from '@flumens';
import { IonIcon } from '@ionic/react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RequiredLabel from '../Components/RequiredLabel';
import './styles.scss';

// constant for page index
const PAGE_INDEX = 4;

// constant for next page
const NEXT_PAGE = 'flower-cover';

// props type for NumberFlower
export type Props = {
  sample: any;
};

// functional component for NumberFlower
const NumberFlower = observer((props: Props) => {
  // destructure sample from props
  const { sample } = props;

  const onValueChange = (value: any): void => {
    // update flower-count in sample data
    sample.data['flower-count'] = value;
    sample.save();
  };

  const onValueChangeSlider = (value: any): void => {
    // update flower-count-number in sample data
    sample.data['flower-count-number'] = value;
    sample.save();
  };

  // check if both values are valid
  const isValueValid =
    !!sample.data['flower-count'] && !!sample.data['flower-count-number'];

  // get survey config and attribute props
  const surveyConfig = sample.getSurvey();

  const attrPropsNumber =
    surveyConfig.attrs['flower-count-number'].pageProps.attrProps;
  const { attrProps } = surveyConfig.attrs['flower-count'].pageProps;

  // get values for rendering
  const flowerType = sample.data['flower-count'];
  const flowerNumber = sample.data['flower-count-number'];

  // render component
  return (
    <Page id="survey-flower-count-page">
      <Header
        sample={sample}
        surveyProgressIndex={PAGE_INDEX}
        backButtonLabel="Flower"
      />

      <Main>
        <InfoMessage
          prefix={<IonIcon src={informationCircleOutline} className="size-6" />}
          color="tertiary"
          className="mb-3"
        >
          What are the <b>number</b> and <b>type</b> of flowers in your patch?
          <InfoButton label="READ MORE" header="Info" color="tertiary">
            <p>
              The number of flowers in a patch can strongly relate to the number
              of insect visitors recorded, so it is important to provide this
              information!
            </p>
            <p>
              Only count flowers that are reasonably fresh and likely to attract
              insects – ‘dead-head’ flowers and seedheads should not be counted.
            </p>
            <p>
              Flowers need to be counted in different ways depending on their
              structure.
            </p>
            <p>
              If you have chosen a target flower from our list, the flower type
              is shown by default.
            </p>
            <p>If you have chosen “Other” target flower, please count:</p>
            <ul>
              <li>
                <b>Individual flowers</b> - each flower counts as one unit
              </li>
              <li>
                <b>Flower heads</b> (where there are lots of tiny flowers within
                a larger flower head, e.g. dandelion or daisy) – each flower
                head counts as one unit
              </li>
              <li>
                <b>Umbels</b> (for flowers that have small flowers grouped into
                ‘umbels’, like inside-out umbrellas, e.g. hogweed) – each umbel
                counts as one unit
              </li>
              <li>
                <b>Spikes</b> (where a number of small flowers are arranged
                along a stem, e.g. lavender) – each spike counts as one unit
              </li>
            </ul>
          </InfoButton>
        </InfoMessage>

        <h3 className="list-title pl-3">
          <div>
            <T>Number</T> {!flowerNumber && <RequiredLabel />}
          </div>
        </h3>

        <Attr
          attr="flower-count-number"
          model={sample}
          {...attrPropsNumber}
          onChange={onValueChangeSlider}
        />

        <h3 className="list-title pl-3">
          <div>
            <T>Type</T> {!flowerType && <RequiredLabel />}
          </div>
        </h3>

        <Attr
          attr="flower-count"
          model={sample}
          {...attrProps}
          onChange={onValueChange}
        />
      </Main>

      {isValueValid && <Footer link={NEXT_PAGE} />}
    </Page>
  );
});

export default NumberFlower;
