import { useState, FC } from 'react';
import { observer } from 'mobx-react';
import { IonCol, IonGrid, IonRow, IonModal, IonImg } from '@ionic/react';
import { Page, Main, ModalHeader, UserFeedbackRequest } from '@flumens';
import config from 'common/config';
import appModel from 'models/app';
import { useTranslation, Trans as T } from 'react-i18next';
import insectsData from 'common/data';
import SpeciesProfile from './species/components/SpeciesProfile';
import './styles.scss';

const Guide: FC = () => {
  const [species, setSpecies] = useState(null);
  const [speciesName, setSpeciesName] = useState('');
  const { t } = useTranslation();

  const showSpeciesModal = (id: string, commonName: string) => {
    const speciesById = (s: any) => s.id === id;

    const flowersOrInsectsData = insectsData as any; // flowers will not be included

    setSpecies(flowersOrInsectsData.find(speciesById));
    setSpeciesName(commonName);
  };

  const getGridCell = ({ name, id }: any) => {
    const onClick = () => showSpeciesModal(id, name);
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

  const getListGrid = (flowersOrInsectsData: any) => {
    const { country } = appModel.attrs;

    const bySortId = (a: any, b: any) => a.sort - b.sort;
    const byCountry = (sp: any) => sp[country] && sp.id !== 'unknown';

    const speciesColumns = flowersOrInsectsData
      .sort(bySortId)
      .filter(byCountry)
      .map(getGridCell);

    return (
      <IonGrid>
        <IonRow>{speciesColumns}</IonRow>
      </IonGrid>
    );
  };

  const onFeedbackDone = () => {
    appModel.attrs.feedbackGiven = true;
    appModel.save();
  };

  const shouldShowFeedback = () => {
    const { feedbackGiven, appSession } = appModel.attrs;
    if (feedbackGiven) {
      return false;
    }

    return appSession > 5;
  };

  const { country } = appModel.attrs;
  const isCyprus = country === 'CY';
  const showFeedback = shouldShowFeedback();
  const { feedbackEmail, feedbackEmailCY } = config;

  const email = isCyprus ? feedbackEmailCY : feedbackEmail;

  const dismissModal = () => setSpecies(null);

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
                email={email}
                onFeedbackDone={onFeedbackDone}
              />
            </IonCol>
          </IonRow>
        )}

        {getListGrid(insectsData)}

        <IonModal isOpen={!!species} backdropDismiss={false}>
          <ModalHeader
            title={t(speciesName)}
            onClose={dismissModal}
            skipTranslation
          />
          {!!species && (
            <SpeciesProfile species={species} appModel={appModel} />
          )}
        </IonModal>
      </Main>
    </Page>
  );
};

export default observer(Guide);
