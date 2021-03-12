import React from 'react';
import { Page, Main, Section } from '@apps';
import { Trans as T } from 'react-i18next';
import './styles.scss';

const { P } = Section;

const Manual = () => (
  <Page id="manual">
    <Main>
      <h1>
        <T>FIT Count quick guide</T>
      </h1>
      <Section>
        <P skipTranslation>
          <ol>
            <li>
              <T>
                FIT Counts take about 10–15 minutes, during which you are asked
                to count every insect that lands on the flowers of your chosen
                target flower species.
              </T>
            </li>
            <li>
              <T>
                You can complete a FIT Count in good weather between 1 April and
                30 September.
              </T>
            </li>
            <li>
              <T>
                Good weather is dry, and with temperature at least 13°C in sunny
                conditions, or at least 15°C when cloudy.
              </T>
            </li>
            <li>
              <T>
                Choose just one type of flower as your target flower - where
                possible use one of the FIT Count target flowers, but if you
                can't find one from the list you can choose a different flower
                as the target.
              </T>
            </li>

            <li>
              <T>Mark out a 50 × 50 cm patch containing your target.</T>
            </li>
            <li>
              <T>
                Count the number of individual flowers for your target species
                that are within your patch.
              </T>
            </li>
            <li>
              <T>
                Using the timer in the app, spend ten minutes counting all
                insects that land on the target flowers (ignore other flowers,
                and do your best to count each individual insect once only!).
              </T>
            </li>
            <li>
              <T>
                Identify the insects into their broad groups (bumblebees,
                hoverflies etc.) – any that you don't recognise should be
                counted as other insects.
              </T>
            </li>
            <li>
              <T>Fill in some simple weather details.</T>
            </li>
            <li>
              <T>Save your count, and upload it to the website.</T>
            </li>
          </ol>
        </P>
        <P skipTranslation>
          <T>Further information and guides are available at</T>:
          <a href="http://ukpoms.org.uk/fit-counts">
            http://ukpoms.org.uk/fit-counts
          </a>
        </P>
      </Section>
    </Main>
  </Page>
);

export default Manual;
