import { informationCircleOutline } from 'ionicons/icons';
import { Page, Main, Section, Header } from '@flumens';
import { IonIcon } from '@ionic/react';
import config from 'common/config';
import appLogo from 'common/images/appLogo.png';
import appModel from 'models/app';
import './styles.scss';

const { P } = Section;

const About = () => {
  const { country } = appModel.data;
  const { feedbackLink } = config;
  const feedback = (feedbackLink as any)[country] || feedbackLink.default;

  return (
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
            FIT Counts are suitable for all, in urban or rural locations, and
            can be done at any time during the FIT Count season – see the quick
            guide <IonIcon icon={informationCircleOutline} /> for the season in
            your country.
          </P>
          <P>
            An increasing amount of evidence suggests that pollinator species
            diversity has declined in many parts of the world, with the
            strongest evidence coming from Europe and North America. Less is
            known about changes in pollinator abundance, and we need much more
            data to be able to track this. You can help by doing a FIT Count,
            maybe even repeating it over the season. You don’t need to identify
            the insects to species level, only to within broad groups e.g.
            bumblebees, hoverflies, butterflies & moths, wasps.
          </P>
        </Section>

        <Section>
          <P>
            The FIT Count was originally developed through the UK Pollinator
            Monitoring Scheme (PoMS). Similar methods are now being adopted in
            other countries, and this app is used by a wide range of pollinator
            monitoring projects:
          </P>

          <ul className="my-5 ml-2 !list-disc pl-4">
            <li>
              <a href="https://ukpoms.org.uk">
                UK Pollinator Monitoring Scheme
              </a>
            </li>
            <li>
              <a href="https://www.ris-ky.info/poms-ky">
                Pollinator Monitoring Scheme Kýpros: PoMS-Ký
              </a>
            </li>
            <li>
              <a href="https://bee-surpass.org">
                {' '}
                Safeguarding Pollinators and Pollination Services in South
                America: SURPASS2
              </a>
            </li>
            <li>
              <a href="https://pollinators.ie">All-Ireland Pollinator Plan</a>
            </li>{' '}
            <li>
              <a href="https://www.ufz.de/spring-pollination/index.php?en=49053">
                EU-Projekt SPRING
              </a>
            </li>
            <li>
              <a href="https://www.pollinet.pt/polinização">
                PolinizAÇÃO: Plano de Ação para a Conservação e Sustentabilidade
                dos Polinizadores
              </a>
            </li>
          </ul>
        </Section>

        <Section>
          <P>
            The FIT Count project is supported by the UK Centre for Ecology &
            Hydrology and can be contacted <a href={feedback}>here</a>.
          </P>
        </Section>
      </Main>
    </Page>
  );
};

export default About;
