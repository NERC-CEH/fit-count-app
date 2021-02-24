import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Attr, Main, InfoMessage } from '@apps';
import { informationCircleOutline } from 'ionicons/icons';
import { IonItemDivider } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './styles.scss';

class NumberFlower extends React.Component {
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

    const value = sample.attrs['flower-count'];

    const valueSlider = sample.attrs['flower-count-number'];

    return (
      <Page id="survey-flower-count-page">
        <Header surveyProgressIndex={5} backButtonLabel="Cover" />

        <Main>
          <InfoMessage icon={informationCircleOutline}>
            What is the <b>number</b> and <b>type</b> of flowers in patch?
          </InfoMessage>

          <IonItemDivider mode="ios" className="survey-divider">
            <T>Number</T>
          </IonItemDivider>

          <Attr
            attrConfig={surveyConfig.attrs['flower-count-number']}
            onValueChange={this.onValueChangeSlider}
            initialVal={valueSlider}
            model={sample}
          />

          <IonItemDivider mode="ios" className="survey-divider">
            <T>Type</T>
          </IonItemDivider>

          <Attr
            attrConfig={surveyConfig.attrs['flower-count']}
            onValueChange={this.onValueChange}
            initialVal={value}
            model={sample}
          />
        </Main>

        <Footer isEnabled={this.isValueValid()} link="insect-count" />
      </Page>
    );
  }
}

export default observer(NumberFlower);
