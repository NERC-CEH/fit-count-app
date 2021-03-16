import React from 'react';
import { IonCol, IonGrid, IonRow, IonModal, IonImg } from '@ionic/react';
import { Page, Main, ModalHeader } from '@apps';
import { Trans as T } from 'react-i18next';
import insectsData from 'common/data';
import SpeciesProfile from './species/components/SpeciesProfile';
import './styles.scss';

class Guide extends React.Component {
  state = {
    showModal: false,
    species: null,
    speciesName: null,
  };

  showSpeciesModal = (id, commonName) => {
    const speciesById = specie => specie.id === id;

    const flowersOrInsectsData = insectsData; // flowers will not be included

    this.setState({
      showModal: true,
      species: flowersOrInsectsData.find(speciesById),
      speciesName: commonName,
    });
  };

  getGridCell = ({ name, id, thumbnail }) => {
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
          <div>
            <T>{name}</T>
          </div>
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
    return (
      <Page id="guide">
        <Main>
          <h1>
            <T>Insect Groups</T>
          </h1>

          {this.getListGrid(insectsData)}

          <IonModal isOpen={!!this.state.species} backdropDismiss={false}>
            <ModalHeader
              title={this.state.speciesName}
              onClose={this.hideSpeciesModal}
            />
            {this.state.showModal && (
              <SpeciesProfile species={this.state.species} />
            )}
          </IonModal>
        </Main>
      </Page>
    );
  }
}

export default Guide;
