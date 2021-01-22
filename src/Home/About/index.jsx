import React from 'react';
import appModel from 'models/app';
import { Page, Main, Section } from '@apps';
import {
  IonList,
  IonImg,
  IonRow,
  IonGrid,
  IonCol,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Trans as T } from 'react-i18next';
import { funders, partners } from './parntersAndFunders';
import './styles.scss';

const { H, P } = Section;

const byLanguage = obj =>
  obj.language ? obj.language === appModel.attrs.language : true;

const getSponsor = ({ images, url, width, alt }) => (
  <IonCol key={images}>
    <a href={url}>
      <IonImg src={images} style={{ width }} alt={alt} />
    </a>
  </IonCol>
);

const getSponsorsGrid = sponsorsOrFunders => {
  const sponsorsColumns = sponsorsOrFunders.filter(byLanguage).map(getSponsor);

  return (
    <IonList>
      <IonGrid>
        <IonRow>{sponsorsColumns}</IonRow>
      </IonGrid>
    </IonList>
  );
};

const About = () => (
  <Page id="about">
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <T>About</T>
        </IonTitle>
      </IonToolbar>
    </IonHeader>

    <Main>
      <Section>
        <P>
          The FIT Count is part of the Pollinator Monitoring Scheme (PoMS)
          within the UK Pollinator Monitoring and Research Partnership,
          co-ordinated by the Centre for Ecology & Hydrology (CEH). It is
          jointly funded by Defra, the Welsh and Scottish Governments, JNCC and
          project partners, including CEH, the Bumblebee Conservation Trust,
          Butterfly Conservation, British Trust for Ornithology, Hymettus, the
          University of Reading and University of Leeds.
        </P>

        <P>
          PoMSaims to provide much-needed data on the state of the UK’s insect
          pollinators, especially wild bees and hoverflies, and the role they
          fulfil in supporting farming and wildlife.
        </P>

        <P>
          For further information about PoMSgo to:{' '}
          <a href="https://www.ceh.ac.uk/pollinator-monitoring">
            www.ceh.ac.uk/pollinator-monitoring to update
          </a>
        </P>

        <H>Partners:</H>

        {getSponsorsGrid(partners)}

        <H>Funders:</H>

        {getSponsorsGrid(funders)}
      </Section>
    </Main>
  </Page>
);

export default About;
