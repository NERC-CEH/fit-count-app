import React from 'react';
import { Page, Main, Section, Header } from '@apps';
import { IonList, IonImg, IonRow, IonGrid, IonCol } from '@ionic/react';
import appLogo from 'common/images/appLogo.png';
import './styles.scss';

const { P } = Section;

const About = () => (
  <Page id="about">
    <Header title="About" />

    <Main>
      <div className="app-logo-wrapper-no-background">
        <img className="app-logo" src={appLogo} alt="appLogo" />
      </div>

      <Section>
        <P>
          The Flower-Insect Timed Count (FIT Count) is a 10-minute survey
          designed to collect new data on numbers of flower-visiting insects.
        </P>
        <P>
          FIT Counts are suitable for all, in urban or rural locations, and can
          be done at any time between the beginning of April and end of
          September.
        </P>
        <P>
          Wild pollinators may have declined in the UK by more than 30% since
          1980, but we need much more data to be able to track changes in
          abundance. You can help by doing a FIT Count, maybe even repeating it
          over the season. You don’t need to identify the insects to species
          level, only to within broad groups e.g. bumblebees, hoverflies,
          butterflies & moths, wasps
        </P>
        <P>
          The FIT Count is part of the UK Pollinator Monitoring Scheme (PoMS),
          within the UK Pollinator Monitoring and Research Partnership which
          comprises the UK Centre for Ecology & Hydrology (UKCEH), Bumblebee
          Conservation Trust, Butterfly Conservation, British Trust for
          Ornithology, Hymettus, Reading University, University of Leeds and
          Natural History Museum. PoMS is jointly funded by Defra, the Welsh and
          Scottish Governments, Daera, JNCC and project partners.
        </P>

        <P>
          For further information about PoMS go to:{' '}
          <a href="https://ukpoms.org.uk">ukpoms.org.uk</a>
        </P>
      </Section>
    </Main>
  </Page>
);

export default About;
