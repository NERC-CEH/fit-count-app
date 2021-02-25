import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Page } from '@apps';
import { observer } from 'mobx-react';
import Main from 'common/Components/Species';
import Header from './Components/Header';
import Footer from './Components/Footer';

const PAGE_INDEX = 7;

const NEXT_PAGE = 'weather-sky';

function InsectCount({ sample }) {
  function isValueValid() {
    return true;
  }

  function onSelect(species) {
    const bySpeciesId = occ => occ.attrs.taxon.id === species.id;
    const occurrence = sample.occurrences.find(bySpeciesId);

    if (!occurrence) {
      throw new Error('An occurrence for species is missing.', species);
    }

    occurrence.attrs.count += 1; // eslint-disable-line
    occurrence.save();
  }

  return (
    <Page id="survey-insect-count-page">
      <Header surveyProgressIndex={PAGE_INDEX} backButtonLabel="Patch" />
      <Main onSelect={onSelect} sample={sample} />

      <Footer isEnabled={isValueValid()} link={NEXT_PAGE} />
    </Page>
  );
}

InsectCount.propTypes = exact({
  sample: PropTypes.object.isRequired,
  match: PropTypes.object, // eslint-disable-line
  location: PropTypes.object, // eslint-disable-line
  history: PropTypes.object, // eslint-disable-line
});

export default observer(InsectCount);
