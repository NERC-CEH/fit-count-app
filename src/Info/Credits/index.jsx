import React from 'react';
import { Header, Page, Main, Section } from '@apps';
import './styles.scss';

const { P } = Section;

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
      </Section>
    </Main>
  </Page>
);

export default Credits;
