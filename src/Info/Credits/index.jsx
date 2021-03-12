import React from 'react';
import { Header, Page, Main, Section } from '@apps';
import { Trans as T } from 'react-i18next';
import './styles.scss';

const { H, P } = Section;

const Credits = () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main>
      <Section>
        <P>We are grateful to all the people who helped to create this app:</P>

        <P skipTranslation>
          <ul className="disable-bullet-points">
            <li>
              <b>Claire Carvell</b> (UKCEH)
            </li>
            <li>
              <b>Martin Harvey</b> (UKCEH)
            </li>
            <li>
              <b>David Roy</b> (UKCEH)
            </li>
            <li>
              <b>Nadine Mitschunas</b> (UKCEH)
            </li>
            <li>
              <b>Karolis Kazlauskis</b> (Flumens)
            </li>
            <li>
              <b>Vilius Stankaitis</b> (Flumens)
            </li>
          </ul>
        </P>

        <P skipTranslation>
          <T>Team members of the following projects</T>:
          <ul>
            <li>UK Pollinator Monitoring Scheme (UK PoMS)</li>
            <li>
              Safeguarding pollinators and pollination services in a changing
              world (SURPASS2)
            </li>
            <li>Pollinator Monitoring Scheme – Kýpros (PoMS-Ký)</li>
          </ul>
        </P>

        <div className="list-background">
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
              <li>Aiwok via Wikimedia (solitary bee)</li>
              <li>Gail Hampshire via Wikimedia (solitary wasp)</li>
              <li>Gilles San Martin vias Wikispecies (Buddleja)</li>
              <li>Malcolm Storey via BioImages (honeybee)</li>
              <li>Peter O'Connor via Flickr CC (Hogweed)</li>
              <li>Trounce via Wikimedia (wasp)</li>
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
        </div>
      </Section>
    </Main>
  </Page>
);

export default Credits;
