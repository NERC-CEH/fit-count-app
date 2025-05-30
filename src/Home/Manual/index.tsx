import { Trans as T } from 'react-i18next';
import { Page, Main, Section } from '@flumens';
import config from 'common/config';
import appModel from 'models/app';
import './styles.scss';

const { P } = Section;

const brazilianGuide = (
  <ol>
    <li>
      <T>
        FIT Counts take about 10–15 minutes, during which you are asked to count
        every flower visitor that lands on the flowers of your chosen target
        flower species.
      </T>
    </li>
    <li>
      <T>
        You can complete a FIT Count in good weather between 1 April and 30
        September.
      </T>
    </li>
    <li>
      <T>
        "Good weather" is dry, and with temperature at least 13°C in sunny
        conditions, or at least 15°C when cloudy.
      </T>
    </li>
    <li>
      <T>
        Choose just one type of flower as your target flower - where possible
        use one of the FIT Count target flowers, but if you can't find one from
        the list you can choose a different flower as the target.
      </T>
    </li>

    <li>
      <T>Mark out a 50 × 50 cm patch containing your target.</T>
    </li>
    <li>
      <T>
        Count the number of individual flowers for your target species that are
        within your patch.
      </T>
    </li>
    <li>
      <T>
        Using the timer in the app, spend ten minutes counting all flower
        visitors that land on the target flowers (ignore other flowers, and do
        your best to count each individual flower visitor once only!).
      </T>
    </li>
    <li>
      <T>
        Identify the flower visitors into their broad groups (bumblebees,
        hoverflies etc.) – any that you don't recognise should be counted as
        "other insects" or "don't know".
      </T>
    </li>
    <li>
      <T>Fill in some simple weather details.</T>
    </li>
    <li>
      <T>Save your count, and upload it to the website.</T>
    </li>
  </ol>
);

const UKGuide = (
  <ol>
    <li>
      <T>
        FIT Counts take about 10–15 minutes, during which you are asked to count
        every insect that lands on the flowers of your chosen target flower
        species.
      </T>
    </li>
    <li>
      <T>
        You can complete a FIT Count in good weather between 1 April and 30
        September.
      </T>
    </li>
    <li>
      <T>
        "Good weather" is dry, and with temperature at least 13°C in sunny
        conditions, or at least 15°C when cloudy.
      </T>
    </li>
    <li>
      <T>
        Choose just one type of flower as your target flower - where possible
        use one of the FIT Count target flowers, but if you can't find one from
        the list you can choose a different flower as the target.
      </T>
    </li>

    <li>
      <T>Mark out a 50 × 50 cm patch containing your target.</T>
    </li>
    <li>
      <T>
        Count the number of individual flowers for your target species that are
        within your patch.
      </T>
    </li>
    <li>
      <T>
        Using the timer in the app, spend ten minutes counting every insect that
        you see that is SITTING on or LANDS on one of your target flowers
        (ignore other flowers, and do your best to count each individual insect
        once only!).
      </T>
    </li>
    <li>
      <T>
        Identify the insects into their broad groups (bumblebees, hoverflies
        etc.) – any that you don't recognise should be counted as "other
        insects".
      </T>
    </li>
    <li>
      <T>Fill in some simple weather details.</T>
    </li>
    <li>
      <T>Save your count, and upload it to the website.</T>
    </li>
  </ol>
);

const guide = (
  <ol>
    <li>
      <T>
        FIT Counts take about 10–15 minutes, during which you are asked to count
        every insect that lands on the flowers of your chosen target flower
        species.
      </T>
    </li>
    <li>
      <T>You can complete a FIT Count in good weather at any time of year.</T>
    </li>
    <li>
      <T>
        "Good weather" is dry, and with temperature at least 13°C in sunny
        conditions, or at least 15°C when cloudy.
      </T>
    </li>
    <li>
      <T>
        Choose just one type of flower as your target flower - where possible
        use one of the FIT Count target flowers, but if you can't find one from
        the list you can choose a different flower as the target.
      </T>
    </li>

    <li>
      <T>Mark out a 50 × 50 cm patch containing your target.</T>
    </li>
    <li>
      <T>
        Count the number of individual flowers for your target species that are
        within your patch.
      </T>
    </li>
    <li>
      <T>
        Using the timer in the app, spend ten minutes counting all insects that
        land on the target flowers (ignore other flowers, and do your best to
        count each individual insect once only!).
      </T>
    </li>
    <li>
      <T>
        Identify the insects into their broad groups (bumblebees, hoverflies
        etc.) – any that you don't recognise should be counted as "other
        insects".
      </T>
    </li>
    <li>
      <T>Fill in some simple weather details.</T>
    </li>
    <li>
      <T>Save your count, and upload it to the website.</T>
    </li>
  </ol>
);

const Manual = () => {
  const { country } = appModel.data;
  const isUK = country === 'UK';
  const isBrazil = country === 'BR';
  const isRestOfWorld = !isUK && !isBrazil;

  const { furtherInfoLink } = config;
  const furtherLink =
    (furtherInfoLink as any)[country] || furtherInfoLink.default;

  return (
    <Page id="manual">
      <Main>
        <Section>
          <h1>
            <T>FIT Count quick guide</T>
          </h1>

          <P skipTranslation>
            {isBrazil && brazilianGuide}
            {isUK && UKGuide}
            {isRestOfWorld && guide}
          </P>
        </Section>

        <Section>
          <P skipTranslation>
            <T>Further information and guides are available at</T>:{' '}
            <a href={furtherLink}>{furtherLink}</a>
          </P>
        </Section>
      </Main>
    </Page>
  );
};

export default Manual;
