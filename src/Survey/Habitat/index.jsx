import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Attr, Main, InfoMessage } from '@apps';
import { IonFooter } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import './styles.scss';

class Habitat extends React.Component {
  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
  });

  onValueChange = value => {
    const { sample } = this.props;
    sample.attrs.habitat = value;
    sample.save();
  };

  isValueValid = () => !!this.props.sample.attrs.habitat;

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();

    const value = sample.attrs.habitat || null;

    return (
      <Page id="survey-habitat-page">
        <Header surveyProgressIndex={2} backButtonLabel="Location" />

        <Main>
          <InfoMessage icon={informationCircleOutline}>
            Select <b>habitat</b> that is the best match.
          </InfoMessage>

          <Attr
            attrConfig={surveyConfig.attrs.habitat}
            onValueChange={this.onValueChange}
            initialVal={value}
            model={sample}
          />
        </Main>

        <IonFooter no-border>
          <Footer isEnabled={this.isValueValid()} link="flower-cover" />
        </IonFooter>
      </Page>
    );
  }
}

export default observer(Habitat);
