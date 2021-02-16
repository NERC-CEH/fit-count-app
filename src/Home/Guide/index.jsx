import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCol,
  IonGrid,
  IonRow,
  IonModal,
  IonLabel,
  IonSegmentButton,
  IonSegment,
  IonImg,
} from '@ionic/react';
import { Page, Main, ModalHeader } from '@apps';
import { Trans as T } from 'react-i18next';
import flowersData from 'common/data/flowers.json';
import insectsData from 'common/data';
import SpeciesProfile from './species/components/SpeciesProfile';
import './styles.scss';

class Guide extends React.Component {
  state = {
    showModal: false,
    species: null,
    segment: 'insects',
    speciesName: null,
  };

  showSpeciesModal = (id, commonName) => {
    const speciesById = specie => specie.id === id;

    const { segment } = this.state;

    const flowersOrInsectsData =
      segment === 'insects' ? insectsData : flowersData;

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
          <div>{name}</div>
        </div>
      </IonCol>
    );
  };

  hideSpeciesModal = () => {
    this.setState({ species: null });
  };

  getListGrid = flowersOrInsectsData => {
    const speciesColumns = flowersOrInsectsData.map(this.getGridCell);

    return (
      <IonGrid>
        <IonRow>{speciesColumns}</IonRow>
      </IonGrid>
    );
  };

  onSegmentClick = e => this.setState({ segment: e.detail.value });

  render() {
    const { segment } = this.state;

    const showingFlowers = segment === 'flowers';
    const showingInsects = segment === 'insects';

    return (
      <Page id="guide">
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonSegment onIonChange={this.onSegmentClick} value={segment}>
              <IonSegmentButton value="insects" checked={showingInsects}>
                <IonLabel className="ion-text-wrap">
                  <T>Insects</T>
                </IonLabel>
              </IonSegmentButton>

              <IonSegmentButton value="flowers" checked={showingFlowers}>
                <IonLabel className="ion-text-wrap">
                  <T>Flowers</T>
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>

        <Main>
          {showingInsects && this.getListGrid(insectsData)}
          {showingFlowers && this.getListGrid(flowersData)}

          <IonModal isOpen={!!this.state.species} backdropDismiss={false}>
            <ModalHeader
              title={this.state.speciesName}
              onClose={this.hideSpeciesModal}
              skipTranslation
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
