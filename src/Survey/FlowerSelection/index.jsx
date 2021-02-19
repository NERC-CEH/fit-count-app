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
import { Trans as T, withTranslation } from 'react-i18next';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './styles.scss';

@observer
class FlowerSelection extends React.Component {
  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
    isDisabled: PropTypes.bool, // eslint-disable-line
    i18n: PropTypes.object, // eslint-disable-line
    tReady: PropTypes.bool, // eslint-disable-line
  });

  onValueChange = value => {
    const { sample } = this.props;
    sample.attrs['flower-selection'] = value;
    sample.save();
  };

  getManualEntry = () => {
    const { sample, t } = this.props;

    const value = sample.attrs['flower-selection'];

    if (value === t('Other')) {
      return (
        <>
          <IonItemDivider mode="ios" className="survey-divider">
            <T>I know the species</T>
          </IonItemDivider>

          <MenuAttrItemFromModel
            model={sample}
            attr="flower-selection-manual-entry"
          />
        </>
      );
    }

    return null;
  };

  isValueValid = () => {
    const { t } = this.props;

    return this.props.sample.attrs['flower-selection'] !== t('Other')
      ? !!this.props.sample.attrs['flower-selection']
      : !!this.props.sample.attrs['flower-selection-manual-entry'];
  };

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();

    const value = sample.attrs['flower-selection'];

    return (
      <Page id="survey-flower-selection-page">
        <Header surveyProgressIndex={3} backButtonLabel="Habitat" />

        <Main>
          <InfoMessage icon={informationCircleOutline}>
            <b>Which</b> target flower have you chosen?
          </InfoMessage>

          <IonItemDivider mode="ios" className="survey-divider">
            <T>Please add species image</T>
          </IonItemDivider>

          <PhotoPicker
            model={sample}
            ImageClass={Media}
            dataDirPath={config.dataPath}
          />

          <Attr
            attrConfig={surveyConfig.attrs['flower-selection']}
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

export default withTranslation()(FlowerSelection);
