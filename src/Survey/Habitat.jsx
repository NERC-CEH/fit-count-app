import { createRef, Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import {
  Page,
  Attr,
  Main,
  InfoMessage,
  InfoButton,
  MenuAttrItemFromModel,
} from '@flumens';
import { informationCircleOutline } from 'ionicons/icons';
import { NavContext, IonItemDivider } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import Header from './Components/Header';
import Footer from './Components/Footer';
import RequiredLabel from './Components/RequiredLabel';

const PAGE_INDEX = 2;

const NEXT_PAGE = 'flower';

class Habitat extends Component {
  static contextType = NavContext;

  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
  });

  contentRef = createRef();

  onValueChange = value => {
    const { sample } = this.props;

    sample.attrs.habitat = value;

    if (sample.attrs.habitat === 'Other') {
      return;
    }

    sample.attrs['habitat-manual-entry'] = null;
    sample.save();

    if (sample.attrs.habitat !== 'Other') {
      const navigateToNextPage = () =>
        this.context.navigate(NEXT_PAGE, undefined, undefined, undefined, {
          unmount: true,
        });

      setTimeout(navigateToNextPage, 50);
    }
  };

  getManualEntry = () => {
    const { sample } = this.props;

    const habitatValue = sample.attrs.habitat;

    const isMissing = !sample.attrs['habitat-manual-entry'];

    if (habitatValue === 'Other') {
      return (
        <div className="record-manual-entry-wrapper">
          <IonItemDivider mode="ios" className="survey-divider">
            <div>
              <T>Other</T> {isMissing && <RequiredLabel />}
            </div>
          </IonItemDivider>

          <MenuAttrItemFromModel
            model={sample}
            attr="habitat-manual-entry"
            skipValueTranslation
          />
        </div>
      );
    }

    return null;
  };

  isValueValid = () => {
    const { sample } = this.props;
    const { habitat } = sample.attrs;
    const habitatManualEntry = sample.attrs['habitat-manual-entry'];

    const hasHabitat = habitat !== 'Other' ? !!habitat : !!habitatManualEntry;

    return hasHabitat;
  };

  // eslint-disable-next-line
  componentDidUpdate = () => {
    const { sample } = this.props;

    if (sample.attrs.habitat === 'Other') {
      this.contentRef.current.scrollToBottom(500);
    }
  };

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();
    const { attrProps } = surveyConfig.attrs.habitat.pageProps;

    return (
      <Page id="survey-habitat-page">
        <Header
          sample={sample}
          surveyProgressIndex={PAGE_INDEX}
          backButtonLabel="Location"
        />

        <Main ref={this.contentRef}>
          <InfoMessage icon={informationCircleOutline}>
            Select one <b>habitat</b> that is the best match.
            <InfoButton label="READ MORE" header="Info">
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

          <Attr attr="habitat" model={sample} {...attrProps} />

          {this.getManualEntry()}
        </Main>

        {this.isValueValid() && <Footer link={NEXT_PAGE} />}
      </Page>
    );
  }
}

export default observer(Habitat);
