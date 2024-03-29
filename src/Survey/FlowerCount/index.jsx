import { Component } from 'react';
import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Trans as T } from 'react-i18next';
import { Page, Attr, Main, InfoMessage, InfoButton } from '@flumens';
import { IonItemDivider } from '@ionic/react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RequiredLabel from '../Components/RequiredLabel';
import './styles.scss';

const PAGE_INDEX = 4;

const NEXT_PAGE = 'flower-cover';

class NumberFlower extends Component {
  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
  });

  onValueChange = value => {
    const { sample } = this.props;
    sample.attrs['flower-count'] = value;
    sample.save();
  };

  onValueChangeSlider = value => {
    const { sample } = this.props;
    sample.attrs['flower-count-number'] = value;
    sample.save();
  };

  isValueValid = () =>
    !!this.props.sample.attrs['flower-count'] &&
    !!this.props.sample.attrs['flower-count-number'];

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();
    const { attrProps: attrPropsNumber } =
      surveyConfig.attrs['flower-count-number'].pageProps;
    const { attrProps } = surveyConfig.attrs['flower-count'].pageProps;

    const flowerType = sample.attrs['flower-count'];

    const flowerNumber = sample.attrs['flower-count-number'];

    return (
      <Page id="survey-flower-count-page">
        <Header
          sample={sample}
          surveyProgressIndex={PAGE_INDEX}
          backButtonLabel="Flower"
        />

        <Main>
          <InfoMessage icon={informationCircleOutline}>
            What are the <b>number</b> and <b>type</b> of flowers in your patch?
            <InfoButton label="READ MORE" header="Info">
              <p>
                The number of flowers in a patch can strongly relate to the
                number of insect visitors recorded, so it is important to
                provide this information!
              </p>

              <p>
                Only count flowers that are reasonably fresh and likely to
                attract insects – ‘dead-head’ flowers and seedheads should not
                be counted.
              </p>

              <p>
                Flowers need to be counted in different ways depending on their
                structure.
              </p>

              <p>
                If you have chosen a target flower from our list, the flower
                type is shown by default.
              </p>

              <p>If you have chosen “Other” target flower, please count:</p>
              <ul>
                <li>
                  <b>Individual flowers</b> - each flower counts as one unit
                </li>
                <li>
                  <b>Flower heads</b> (where there are lots of tiny flowers
                  within a larger flower head, e.g. dandelion or daisy) – each
                  flower head counts as one unit
                </li>
                <li>
                  <b>Umbels</b> (for flowers that have small flowers grouped
                  into ‘umbels’, like inside-out umbrellas, e.g. hogweed) – each
                  umbel counts as one unit
                </li>
                <li>
                  <b>Spikes</b> (where a number of small flowers are arranged
                  along a stem, e.g. lavender) – each spike counts as one unit
                </li>
              </ul>
            </InfoButton>
          </InfoMessage>

          <IonItemDivider mode="ios" className="survey-divider">
            <div>
              <T>Number</T> {!flowerNumber && <RequiredLabel />}
            </div>
          </IonItemDivider>

          <Attr
            attr="flower-count-number"
            model={sample}
            {...attrPropsNumber}
          />

          <IonItemDivider mode="ios" className="survey-divider">
            <div>
              <T>Type</T> {!flowerType && <RequiredLabel />}
            </div>
          </IonItemDivider>

          <Attr attr="flower-count" model={sample} {...attrProps} />
        </Main>

        {this.isValueValid() && <Footer link={NEXT_PAGE} />}
      </Page>
    );
  }
}

export default observer(NumberFlower);
