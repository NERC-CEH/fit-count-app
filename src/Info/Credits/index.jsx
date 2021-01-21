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
            <li>Karolis Kazlauskis (Flumens)</li>
            <li>Vilius Stankaitis (Flumens)</li>
            <li>Lorrum ipsum</li>
            <li>Lorrum ipsum</li>
            <li>Lorrum ipsum</li>
            <li>Lorrum ipsum</li>
            <li>Lorrum ipsum</li>
            <li>Lorrum ipsum</li>
          </ul>
        </P>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          vulputate a neque sit amet cursus. Sed lorem libero, feugiat quis nibh
          sit amet, tempus fringilla tortor. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
          Donec feugiat vehicula facilisis. Nullam gravida efficitur venenatis.
          Vestibulum et laoreet nibh, in imperdiet justo. Vivamus fringilla
          mauris metus, ut euismod libero dapibus et. Integer nec turpis
          volutpat, auctor felis vulputate, gravida erat.
        </P>
      </Section>
    </Main>
  </Page>
);

export default Credits;
