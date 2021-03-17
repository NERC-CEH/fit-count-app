import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { IonCol, IonGrid, IonRow, IonModal, IonImg } from '@ionic/react';
import { Page, Main, ModalHeader } from '@apps';
import { withTranslation, Trans as T } from 'react-i18next';
import insectsData from 'common/data';
import SpeciesProfile from './species/components/SpeciesProfile';
import './styles.scss';

class Guide extends React.Component {
  static propTypes = exact({
    history: PropTypes.object, // eslint-disable-line
    location: PropTypes.object, // eslint-disable-line
    staticContext: PropTypes.object, // eslint-disable-line
    i18n: PropTypes.object, // eslint-disable-line
    tReady: PropTypes.bool, // eslint-disable-line
    match: PropTypes.object, // eslint-disable-line
    t: PropTypes.func,
  });

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

  getGridCell = ({ name, id, thumbnail }) => {
    const { t } = this.props;

    const onClick = () => this.showSpeciesModal(id, name);

    const image = thumbnail && <IonImg src={thumbnail} />;

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

  hideSpeciesModal = () => {
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

  render() {
    const { t } = this.props;

    return (
      <Page id="guide">
        <Main>
          <h1>
            <T>Insect Groups</T>
          </h1>

          {this.getListGrid(insectsData)}

          <IonModal isOpen={!!this.state.species} backdropDismiss={false}>
            <ModalHeader
              title={t(this.state.speciesName)}
              onClose={this.hideSpeciesModal}
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

export default withTranslation()(Guide);
