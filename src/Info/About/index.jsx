import React from 'react';
import { Page, Main, Section, Header } from '@apps';
import { IonIcon } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
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
          be done at any time during the FIT Count season – see the quick guide{' '}
          <IonIcon icon={informationCircleOutline} /> for the season in your
          country.
        </P>
        <P>
          An increasing amount of evidence suggests that pollinator species
          diversity has declined in many parts of the world, with the strongest
          evidence coming from Europe and North America. Less is known about
          changes in pollinator abundance, and we need much more data to be able
          to track this. You can help by doing a FIT Count, maybe even repeating
          it over the season. You don’t need to identify the insects to species
          level, only to within broad groups e.g. bumblebees, hoverflies,
          butterflies & moths, wasps.
        </P>
        <P>
          The FIT Count was originally developed through the UK Pollinator
          Monitoring Scheme (PoMS). Similar methods are now being adopted in
          other countries, and this app is used by a wide range of pollinator
          monitoring projects:
        </P>

        <ul>
          <li>
            UK Pollinator Monitoring Scheme{' '}
            <a href="https://ukpoms.org.uk">ukpoms.org.uk</a>
          </li>
          <li>
            Pollinator Monitoring Scheme Kýpros: PoMS-Ký
            <a href="https://www.ris-ky.info/poms-ky">
              https://www.ris-ky.info/poms-ky
            </a>
          </li>
          <li>
            Safeguarding Pollinators and Pollination Services in South America:
            SURPASS2{' '}
            <a href="https://bee-surpass.org">https://bee-surpass.org</a>
          </li>
          <li>
            All-Ireland Pollinator Plan:{' '}
            <a href="https://pollinators.ie">https://pollinators.ie</a>
          </li>
        </ul>

        <P>
          The FIT Count project is supported by the UK Centre for Ecology &
          Hydrology and can be contacted here:{' '}
          <a href="https://fitcount.ceh.ac.uk/contact">
            https://fitcount.ceh.ac.uk/contact
          </a>
        </P>
      </Section>
    </Main>
  </Page>
);

export default About;
