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
} from '@apps';
import { informationCircleOutline } from 'ionicons/icons';
import Media from 'models/media';
import { IonItemDivider, IonFooter } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './styles.scss';

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
    sample.save();
  };

  getManualEntry = () => {
    const { sample } = this.props;

    const value = sample.attrs.flower;

    if (value === 'Other') {
      return (
        <div className="manual-entry-wrapper">
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

    return flower !== 'Other' ? !!flower : !!flowerManualEntry;
  };

  componentDidUpdate = () => {
    const { sample } = this.props;

    if (sample.attrs.flower === 'Other') {
      this.contentRef.current.scrollToBottom(500);
    }
  };

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();

    const value = sample.attrs.flower;

    return (
      <Page id="survey-flower-page">
        <Header surveyProgressIndex={3} backButtonLabel="Habitat" />

        <Main ref={this.contentRef} fullscreen="true">
          <InfoMessage icon={informationCircleOutline}>
            Which target <b>flower</b> have you chosen?
          </InfoMessage>

          <IonItemDivider mode="ios" className="survey-divider">
            <T>Photos</T>
          </IonItemDivider>

          <PhotoPicker
            model={sample}
            ImageClass={Media}
            dataDirPath={config.dataPath}
          />
          <IonItemDivider mode="ios" className="survey-divider">
            <T>Species</T>
          </IonItemDivider>
          <Attr
            attrConfig={surveyConfig.attrs.flower}
            onValueChange={this.onValueChange}
            initialVal={value}
            model={sample}
            value={value}
          />

          {this.getManualEntry()}
        </Main>

        <IonFooter no-border>
          <Footer isEnabled={this.isValueValid()} link="flower-cover" />
        </IonFooter>
      </Page>
    );
  }
}

export default Flower;
