import React from 'react';
import { IonGrid, IonList, IonRow, IonCol } from '@ionic/react';
import { Header, Page, Main, Section } from '@flumens';
import appModel from 'models/app';
import { Trans as T } from 'react-i18next';
import surpassLogo from './images/SURPASS_logo.png';
import pomsLogo from './images/PoMS_Logo_WithStrap_Positive_Black.png';
import pMSkyLogo from './images/PoMSKy.png';
import './styles.scss';

const { H, P } = Section;

const Credits = () => {
  const { country } = appModel.attrs;
  const isCyprus = country === 'CY';
  const isBrazil = country === 'BR';
  const isIreland = country === 'IE';
  const isRestOfWorld = !isCyprus && !isBrazil && !isIreland;

  return (
    <Page id="credits">
      <Header title="Credits" />
      <Main>
        <Section>
          <P skipTranslation>
            <T>This app has been created by the</T>{' '}
            <a href="https://www.ceh.ac.uk/">
              UK Centre for Ecology & Hydrology
            </a>{' '}
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
              <a href="http://ukpoms.org.uk">
                UK Pollinator Monitoring Scheme (UK PoMS)
              </a>
            </li>

            <li>
              <a href="https://www.ris-ky.info/poms-ky">
                Pollinator Monitoring Scheme Kýpros: PoMS-Ký
              </a>
            </li>

            <li>
              <a href="https://bee-surpass.org">
                Safeguarding pollinators and pollination services in a changing
                world (SURPASS2)
              </a>
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
              </IonRow>
              <IonRow>
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
            <T>App design concepts</T>: Francisco E. Fontúrbel (Pontificia
            Universidad Católica de Valparaíso)
          </P>

          <P skipTranslation>
            <T>Photos of flowers and insects by:</T>
            <ul>
              <li>Martin Harvey</li>
              <li>Nadine Mitschunas</li>
              {isBrazil && (
                <>
                  <li>André Matos</li>
                  <li>Sheina Koffler</li>
                </>
              )}
            </ul>
          </P>

          <P skipTranslation>
            <T>Thanks to the following for additional photos</T>:
            {isCyprus && (
              <ul>
                <li>Marios Philippou</li>
                <li>Pantelis Charilaou</li>
                <li>Graham Johnstone</li>
                <li>Kelly Martinou</li>
                <li>Ioanna Angelidou</li>
                <li>Andri J. Varnava</li>
                <li>Jakovos Demetriou</li>
                <li>David Navrátil & 8K postprocessing M.Hoskovec</li>
                <li>Gail Hampshire via Wikimedia</li>
                <li>Malcolm Storey via BioImages</li>
                <li>Trounce via Wikimedia</li>
                <li>Liam Lysaght</li>
                <li>Colm Moriarty</li>
                <li>John Walsh</li>
                <li>Mary Douglas</li>
              </ul>
            )}
            {isIreland && (
              <ul>
                <li>Aiwok via Wikimedia</li>
                <li>Gail Hampshire via Wikimedia</li>
                <li>Gilles San Martin vias Wikispecies</li>
                <li>Malcolm Storey via BioImages</li>
                <li>Peter O'Connor via Flickr CC </li>
                <li>Trounce via Wikimedia</li>
                <li>Liam Lysaght</li>
                <li>Colm Moriarty</li>
                <li>John Walsh</li>
                <li>Mary Douglas</li>
              </ul>
            )}
            {isBrazil && (
              <ul>
                <li>Kleber Del-Claro via Ciência que nós fazemos</li>
                <li>Malcolm Storey via BioImages</li>
                <li>Filipi Miranda Soares via iNaturalist</li>
                <li>Vitor Barão via flickr</li>
                <li>Macelo Costa via iNaturalist</li>
                <li>Carlos Otávio Gussoni via iNaturalist</li>
                <li>Celso Modesto via iNaturalist</li>
                <li>Julio Pupim via flickr</li>
                <li>José Valério via iNaturalist</li>
                <li>Julio Pupim via flickr</li>
                <li>Guilherme Piva via iNaturalist</li>
                <li>Gabriele Cordeiro via iNaturalist</li>
                <li>Cesar Massi via iNaturalist</li>
                <li>Andrew Neild via flickr</li>
                <li>Luis Funez via iNaturalist</li>
                <li>Claudio Martins via iNaturalist</li>
                <li>João Burini via Wikimedia Commons</li>
                <li>Paulo Roberto de Souza via flickr</li>
                <li>Conrado via Wikimedia Commons</li>
                <li>Rodrigo Mayworm via iNaturalist</li>
                <li>H. Zell via Wikimedia Commons</li>
                <li>Elias Rovielo via flickr</li>
                <li>bkmertz via iNaturalist</li>
                <li>Guilherme Mansueto via flickr</li>
                <li>Amy Wilson via Wikimedia Commons</li>
                <li>Bernard Dupont via flickr</li>
                <li>Joaquim Alves Gaspar via Wikimedia Commons</li>
                <li>Gilmar Ferreira via iNaturalist</li>
                <li>Tom Mushroom via flickr</li>
                <li>Maurício Mercadante via flickr</li>
                <li>Vengolis via Wikimedia Commons</li>
                <li>JPC Raleigh via flickr</li>
              </ul>
            )}
            {isRestOfWorld && (
              <ul>
                <li>Aiwok via Wikimedia</li>
                <li>Gail Hampshire via Wikimedia</li>
                <li>Gilles San Martin vias Wikispecies</li>
                <li>Malcolm Storey via BioImages</li>
                <li>Peter O'Connor via Flickr CC </li>
                <li>Trounce via Wikimedia</li>
              </ul>
            )}
          </P>

          <P>
            Icons made by{' '}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </P>
          <P skipTranslation>
            <T>App guide illustrations made by</T>:
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

              {isBrazil && (
                <>
                  <li>
                    <a href="https://www.clipartmax.com" title="Clker">
                      https://www.clipartmax.com
                    </a>
                  </li>
                  <li>
                    <a href="https://www.clipartmax.com" title="Clker">
                      Paula Drago
                    </a>
                  </li>
                </>
              )}
            </ul>
          </P>
        </Section>
      </Main>
    </Page>
  );
};

export default Credits;
