import React from 'react';
import { Header, Page, Main, Section } from '@apps';
import './styles.scss';

const { H, P } = Section;

const Credits = () => (
  <Page id="credits">
    <Header title="Credits" />
    <Main>
      <Section>
        <P>
          We are grateful for all the people that helped to create this app:
        </P>
        <P skipTranslation>
          <ul>
            <li>Claire Carvell (UKCEH)</li>
            <li>Martin Harvey (UKCEH)</li>
            <li>Karolis Kazlauskis (Flumens)</li>
            <li>Vilius Stankaitis (Flumens)</li>
          </ul>
        </P>
        <H>Graphics</H>
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
          App guide illustrations made by
          <br />
          <br />
          <a href="https://www.divulgare.net/" title="Divulgare">
            www.divulgare.net
          </a>
          <br />
          <br />
          <a href="https://flic.kr/p/2k2HaKk" title="Flic">
            https://flic.kr/p/2k2HaKk
          </a>
          <br />
          <br />
          <a href="hhttp://www.clker.com/" title="Clker">
            http://www.clker.com/
          </a>
        </P>
      </Section>
    </Main>
  </Page>
);

export default Credits;
