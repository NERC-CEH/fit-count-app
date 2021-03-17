import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import config from 'common/config';
import {
  Page,
  Attr,
  Main,
  PhotoPicker,
  MenuAttrItemFromModel,
  InfoMessage,
  InfoButton,
} from '@apps';
import { informationCircleOutline } from 'ionicons/icons';
import Media from 'models/media';
import { IonItemDivider } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './styles.scss';

const PAGE_INDEX = 3;
const NEXT_PAGE = 'flower-count';

@observer
class Flower extends React.Component {
  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
    isDisabled: PropTypes.bool, // eslint-disable-line
  });

  contentRef = React.createRef();

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

    if (value === 'Other') {
      return (
        <div className="record-manual-entry-wrapper">
          <IonItemDivider mode="ios" className="survey-divider">
            <T>I know the species</T>
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

    const flowersOptions = surveyConfig.attrs.flower.componentProps.options;

    const byFlowerName = flower => flower.value === selectedFlowerName;

    const flower = flowersOptions.find(byFlowerName);

    sample.attrs['flower-count'] = flower.type;
    sample.save();
  };

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();
    const attr = surveyConfig.attrs.flower;

    const value = sample.attrs.flower;

    return (
      <Page id="survey-flower-page">
        <Header surveyProgressIndex={PAGE_INDEX} backButtonLabel="Habitat" />

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
            <T>Photo of your target flower</T>
          </IonItemDivider>
          <PhotoPicker
            model={sample}
            ImageClass={Media}
            dataDirPath={config.dataPath}
          />

          <IonItemDivider mode="ios" className="survey-divider">
            <T>Target flower chosen</T>
          </IonItemDivider>
          <Attr
            component={attr.type}
            componentProps={attr.componentProps}
            onChange={this.onValueChange}
            value={value}
          />

          {this.getManualEntry()}
        </Main>

        {this.isValueValid() && <Footer link={NEXT_PAGE} />}
      </Page>
    );
  }
}

export default Flower;
