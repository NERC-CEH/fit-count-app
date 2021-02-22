import React from 'react';
import appModel from 'models/app';
import { Page, Main, Section } from '@apps';
import { IonList, IonImg, IonRow, IonGrid, IonCol } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import { funders, partners } from './partnersAndFundersImages';
import './styles.scss';

const { H, P } = Section;

const byCountry = partnersAndFundersParameter => {
  const isInCyprus = appModel.attrs.country === 'CYP';

  const isFunderType = partnersAndFundersParameter.type === 'funders';

  if (isFunderType) {
    return true;
  }

  return partnersAndFundersParameter.forCyprus ? isInCyprus : !isInCyprus;
};

const getSponsor = ({ images, url, width, alt }) => (
  <IonCol key={images}>
    <a href={url}>
      <IonImg src={images} style={{ width }} alt={alt} />
    </a>
  </IonCol>
);

const getSponsorsGrid = sponsorsOrFunders => {
  const sponsorsColumns = sponsorsOrFunders.filter(byCountry).map(getSponsor);

  return (
    <IonList className="list-background">
      <IonGrid>
        <IonRow>{sponsorsColumns}</IonRow>
      </IonGrid>
    </IonList>
  );
};

const About = () => (
  <Page id="about">
    <Main>
      <h1>
        <T>About</T>
      </h1>

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

        <div className="rounded">
          <H>Partners:</H>

          {getSponsorsGrid(partners)}
        </div>

        <div className="rounded">
          <H>Funders:</H>

          {getSponsorsGrid(funders)}
        </div>
      </Section>
    </Main>
  </Page>
);

export default About;
