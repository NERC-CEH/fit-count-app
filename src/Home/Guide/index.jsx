import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { observer } from 'mobx-react';
import { IonCol, IonGrid, IonRow, IonModal, IonImg } from '@ionic/react';
import { Page, Main, ModalHeader, UserFeedbackRequest } from '@apps';
import config from 'common/config';
import { withTranslation, Trans as T } from 'react-i18next';
import insectsData from 'common/data';
import SpeciesProfile from './species/components/SpeciesProfile';
import './styles.scss';

class Guide extends React.Component {
  static propTypes = exact({
    appModel: PropTypes.object.isRequired,
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
    staticContext: PropTypes.object, // eslint-disable-line
    i18n: PropTypes.object, // eslint-disable-line
    tReady: PropTypes.bool, // eslint-disable-line
    match: PropTypes.object, // eslint-disable-line
    t: PropTypes.func,
  });

  modal = React.createRef();

  state = {
    species: null,
    speciesName: null,
  };

  showSpeciesModal = (id, commonName) => {
    const speciesById = specie => specie.id === id;

    const flowersOrInsectsData = insectsData; // flowers will not be included

    this.setState({
      species: flowersOrInsectsData.find(speciesById),
      speciesName: commonName,
    });
  };

  getGridCell = ({ name, id, UK }) => {
    const { t } = this.props;

    if (!UK) return null;

    const onClick = () => this.showSpeciesModal(id, name);
    const image = <IonImg src={`/images/${id}.png`} />;

    return (
      <IonCol
        key={name}
        className="species-list-item"
        onClick={onClick}
        size="6"
      >
        <div className="species-label">
          <div className="species-wrapper">{image}</div>
          <div>{t(name)}</div>
        </div>
      </IonCol>
    );
  };

  dismissModal = () => {
    this.modal.current.dismiss();
  };

  dismissModalCleanup = () => {
    this.setState({ species: null });
  };

  getListGrid = flowersOrInsectsData => {
    const bySortId = (a, b) => a.sort - b.sort;

    const speciesColumns = flowersOrInsectsData
      .sort(bySortId)
      .map(this.getGridCell);

    return (
      <IonGrid>
        <IonRow>{speciesColumns}</IonRow>
      </IonGrid>
    );
  };

  onFeedbackDone = () => {
    const { appModel } = this.props;
    appModel.attrs.feedbackGiven = true;
    appModel.save();
  };

  shouldShowFeedback = () => {
    const { appModel } = this.props;

    const { feedbackGiven, appSession } = appModel.attrs;
    if (feedbackGiven) {
      return false;
    }

    return appSession > 5;
  };

  render() {
    const { t } = this.props;

    const showFeedback = this.shouldShowFeedback();

    return (
      <Page id="guide">
        <Main>
          <h1>
            <T>Pollinator Groups</T>
          </h1>

          {showFeedback && (
            <IonRow className="user-feedback-row">
              <IonCol size="12">
                <UserFeedbackRequest
                  email={config.feedbackEmail}
                  onFeedbackDone={this.onFeedbackDone}
                />
              </IonCol>
            </IonRow>
          )}

          {this.getListGrid(insectsData)}

          <IonModal
            ref={this.modal}
            isOpen={!!this.state.species}
            backdropDismiss={false}
            onDidDismiss={this.dismissModalCleanup}
          >
            <ModalHeader
              title={t(this.state.speciesName)}
              onClose={this.dismissModal}
              skipTranslation
            />
            {!!this.state.species && (
              <SpeciesProfile species={this.state.species} />
            )}
          </IonModal>
        </Main>
      </Page>
    );
  }
}

export default withTranslation()(observer(Guide));
