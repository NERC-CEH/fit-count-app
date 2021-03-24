import React from 'react';
import { IonGrid, IonList, IonRow, IonCol } from '@ionic/react';
import { Header, Page, Main, Section } from '@apps';
import { Trans as T } from 'react-i18next';
import surpassLogo from './images/SURPASS_logo.png';
import pomsLogo from './images/PoMS_Logo_WithStrap_Positive_Black.png';
import pMSkyLogo from './images/p-MS-ky.png';
import './styles.scss';

const { H, P } = Section;

const Credits = () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main>
      <Section>
        <P skipTranslation>
          <T>This app has been created by the</T>{' '}
          <a href="https://www.ceh.ac.uk/">UK Centre for Ecology & Hydrology</a>{' '}
          <T>with technical development by</T>{' '}
          <a href="https://flumens.io/">Flumens</a>.
        </P>

        <P skipTranslation>
          <T>
            App development has been supported by the funders and partners of
            these pollinator projects around the world
          </T>
          :
        </P>

        <ul>
          <li>
            UK Pollinator Monitoring Scheme (UK PoMS){' '}
            <a href="http://ukpoms.org.uk">http://ukpoms.org.uk</a>
          </li>

          <li>
            Pollinator Monitoring Scheme Kýpros: PoMS-Ký{' '}
            <a href="https://www.ris-ky.info/poms-ky">
              https://www.ris-ky.info/poms-ky
            </a>
          </li>

          <li>
            Safeguarding pollinators and pollination services in a changing
            world (SURPASS2){' '}
            <a href="https://bee-surpass.org">https://bee-surpass.org</a>
          </li>
        </ul>

        <IonList className="list-background">
          <IonGrid>
            <IonRow>
              <IonCol>
                <a href="http://ukpoms.org.uk">
                  <img src={pomsLogo} />
                </a>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <a href="https://www.ris-ky.info/poms-ky">
                  <img src={pMSkyLogo} />
                </a>
              </IonCol>
              <IonCol>
                <a href="https://bee-surpass.org">
                  <img src={surpassLogo} />
                </a>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonList>

        <H>Graphics:</H>
        <P skipTranslation>
          <T>FIT Count logo</T>: Heather Harris (UKCEH)
        </P>

        <P skipTranslation>
          <T>Photos of flowers and insects by:</T>
          <ul>
            <li>Martin Harvey</li>
            <li>Nadine Mitschunas</li>
          </ul>
        </P>

        <P skipTranslation>
          <T>Thanks to the following for additional photos</T>:
          <ul>
            <li>Aiwok via Wikimedia</li>
            <li>Gail Hampshire via Wikimedia</li>
            <li>Gilles San Martin vias Wikispecies</li>
            <li>Malcolm Storey via BioImages</li>
            <li>Peter O'Connor via Flickr CC </li>
            <li>Trounce via Wikimedia</li>
          </ul>
        </P>

        <P>
          Icons made by{' '}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{' '}
          from
          <br />
          <br />
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </P>
        <P>
          App guide illustrations made by:
          <ul>
            <li>
              <a href="https://www.divulgare.net/" title="Divulgare">
                www.divulgare.net
              </a>
            </li>

            <li>
              <a href="https://flic.kr/p/2k2HaKk" title="Flic">
                https://flic.kr/p/2k2HaKk
              </a>
            </li>

            <li>
              <a href="hhttp://www.clker.com/" title="Clker">
                http://www.clker.com/
              </a>
            </li>
          </ul>
        </P>
      </Section>
    </Main>
  </Page>
);

export default Credits;
