import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page, Main, InfoMessage } from '@apps';
import { informationCircleOutline } from 'ionicons/icons';
import {
  IonItem,
  IonList,
  IonRadioGroup,
  IonLabel,
  IonRadio,
} from '@ionic/react';
import { Trans as T } from 'react-i18next';
import Header from '../Components/Header';
import './styles.scss';

class FlowerCover extends React.Component {
  static propTypes = exact({
    sample: PropTypes.object.isRequired,
    match: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
  });

  onChange = e => {
    const { sample } = this.props;
    sample.attrs['flower-cover'] = e.target.value;
    sample.save();
  };

  getInput = ({ value, id, background }) => {
    return (
      <IonItem key={`${value}  ${id}`}>
        {!!background && (
          <div className="flower-cover-imageProfile">
            <img src={background} />
          </div>
        )}

        <IonLabel>
          <T>{value}</T>
        </IonLabel>
        <IonRadio color="secondary" value={value} onClick={this.onChange} />
      </IonItem>
    );
  };

  isValueValid = () => !!this.props.sample.attrs['flower-cover'];

  render() {
    const { sample } = this.props;

    const surveyConfig = sample.getSurvey();

    const flowerCoverData = surveyConfig.attrs['flower-cover'].options;

    const flowerCoverList = flowerCoverData.map(this.getInput);

    const value = sample.attrs['flower-cover'] || null;

    return (
      <Page id="survey-flower-cover-page">
        <Header surveyProgressIndex={3} backButtonLabel="Habitat" />

        <Main>
          <InfoMessage icon={informationCircleOutline}>
            What is the target flower <b>cover</b>.
          </InfoMessage>

          <IonList lines="full">
            <IonRadioGroup value={value}>{flowerCoverList}</IonRadioGroup>
          </IonList>
        </Main>
      </Page>
    );
  }
}

export default observer(FlowerCover);
