import { createRef, Component } from 'react';
import { observer } from 'mobx-react';
import { informationCircleOutline } from 'ionicons/icons';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Trans as T } from 'react-i18next';
import {
  Page,
  Attr,
  Main,
  MenuAttrItemFromModel,
  InfoMessage,
  InfoButton,
} from '@flumens';
import { IonItemDivider } from '@ionic/react';
import config from 'common/config';
import Media from 'models/media';
import PhotoPicker from 'Components/PhotoPicker';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RequiredLabel from '../Components/RequiredLabel';
import './images';
import './styles.scss';

const PAGE_INDEX = 3;
const NEXT_PAGE = 'flower-count';

class Flower extends Component {
  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
    isDisabled: PropTypes.bool, // eslint-disable-line
  });

  contentRef = createRef();

  onValueChange = value => {
    const { sample } = this.props;
    sample.attrs.flower = value;

    this.setFlowerType(value);

    if (sample.attrs.flower === 'Other') {
      this.contentRef.current.scrollToBottom(500);
      return;
    }

    sample.attrs['flower-manual-entry'] = null;
    sample.save();
  };

  getManualEntry = () => {
    const { sample } = this.props;

    const value = sample.attrs.flower;

    const isMissing = !sample.attrs['flower-manual-entry'];

    if (value === 'Other') {
      return (
        <div className="record-manual-entry-wrapper">
          <IonItemDivider mode="ios" className="survey-divider">
            <div>
              <T>Please add the name of the flower</T>{' '}
              {isMissing && <RequiredLabel />}
            </div>
          </IonItemDivider>

          <MenuAttrItemFromModel model={sample} attr="flower-manual-entry" />
        </div>
      );
    }

    return null;
  };

  isValueValid = () => {
    const { sample } = this.props;

    const { flower } = sample.attrs;
    const flowerManualEntry = sample.attrs['flower-manual-entry'];

    const hasSpeciesSet = flower !== 'Other' ? !!flower : !!flowerManualEntry;

    const hasPhoto = !!sample.media.length;
    return hasSpeciesSet && hasPhoto;
  };

  setFlowerType = selectedFlowerName => {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();

    const flowersOptions =
      surveyConfig.attrs.flower.pageProps.attrProps.inputProps().options;

    const byFlowerName = flower => flower.value === selectedFlowerName;

    const flower = flowersOptions.find(byFlowerName);

    sample.attrs['flower-count'] = flower.type;
    sample.save();
  };

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();
    const { attrProps } = surveyConfig.attrs.flower.pageProps;

    const value = sample.attrs.flower;

    const flowerManualEntry = sample.attrs['flower-manual-entry'];

    const isMissingFlower = value !== 'Other' ? !!value : !!flowerManualEntry;

    const isMissingPhoto = !sample.media.length;

    return (
      <Page id="survey-flower-page">
        <Header
          sample={sample}
          surveyProgressIndex={PAGE_INDEX}
          backButtonLabel="Habitat"
        />

        <Main ref={this.contentRef} fullscreen="true">
          <InfoMessage icon={informationCircleOutline}>
            Which target <b>flower</b> have you chosen?
            <InfoButton label="READ MORE" header="Info">
              <p>
                Where possible please choose a patch of flowers from one of the
                target flower groups in the list.
              </p>
              <p>
                If none of these is available at your location you can choose
                another flower that is attracting insects and select “Other”,
                then type in the name.
              </p>

              <p>
                Your target flower can be growing in a patch all of the same
                flower, or among different flower species.
              </p>

              <p>
                For each FIT Count, please upload one or two photos of your
                target flower.
              </p>

              <p>
                This allows us to double-check the flower species used for the
                counts.
              </p>
            </InfoButton>
          </InfoMessage>

          <IonItemDivider mode="ios" className="survey-divider">
            <div>
              <T>Photo of your target flower</T>{' '}
              {isMissingPhoto && <RequiredLabel />}
            </div>
          </IonItemDivider>
          <PhotoPicker
            model={sample}
            ImageClass={Media}
            dataDirPath={config.dataPath}
          />

          <IonItemDivider mode="ios" className="survey-divider">
            <div>
              <T>Target flower chosen</T>{' '}
              {!isMissingFlower && <RequiredLabel />}
            </div>
          </IonItemDivider>
          <Attr
            attr="flower"
            model={sample}
            onChange={this.onValueChange}
            {...attrProps}
          />

          {this.getManualEntry()}
        </Main>

        {this.isValueValid() && <Footer link={NEXT_PAGE} />}
      </Page>
    );
  }
}

export default observer(Flower);
