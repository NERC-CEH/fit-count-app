/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { date as dateHelp } from '@apps';
import insectGroups from 'common/data';
import { flowerOutline } from 'ionicons/icons';

import flowerCoverLargeGroupImage from './FlowerCover/images/groupLarge.png';
import flowerCoverMediumGroupImage from './FlowerCover/images/groupMedium.png';
import flowerCoverSmallGroupImage from './FlowerCover/images/groupSmall.png';

import individualFlowerTypeImage from './FlowerCount/images/individualFlowerType.png';
import headTypeImage from './FlowerCount/images/headType.png';
import umbelTypeImage from './FlowerCount/images/umbelType.png';
import spikeTypeImage from './FlowerCount/images/spikeType.png';

const habitatValues = [
  {
    id: -1,
    value: 'Garden',
  },
  {
    id: -1,
    value: 'School Ground',
  },
  {
    id: -1,
    value: 'Parklands with trees',
  },
  {
    id: -1,
    value: 'Churchyard',
  },
  {
    id: -1,
    value: 'Grassy verge or hedgerow edge',
  },
  { id: -1, value: 'Grassland with wild flowers (e.g. meadow)' },
  { id: -1, value: 'Amenity grassland (usually mown short)' },
  { id: -1, value: 'Farm crops or grassy pasture' },
  { id: -1, value: 'Upland moorland' },
  { id: -1, value: 'Lowland heath' },
  { id: -1, value: 'Waste ground' },
  { id: -1, value: 'School grounds Farm crops or grassy pastures' },
  { id: -1, value: 'Woodland' },
  { id: -1, value: 'Other' },
];

const flowerCoverValues = [
  {
    id: -1,
    value: 'Less than half of 50x50cm patch',
    icon: flowerCoverSmallGroupImage,
  },
  {
    id: -1,
    value: 'Half of path',
    icon: flowerCoverMediumGroupImage,
  },
  {
    id: -1,
    value: 'More than half of path',
    icon: flowerCoverLargeGroupImage,
  },
  {
    id: -1,
    value: 'Not recorded',
  },
];

const flowerSelectionValues = [
  {
    id: -1,
    value: 'Dandelion',
  },
  {
    id: -1,
    value: 'Buttercup',
  },
  {
    id: -1,
    value: 'White Dead-nettle',
  },
  {
    id: -1,
    value: 'Hawthorn',
  },
  {
    id: -1,
    value: 'Lavender',
  },
  {
    id: -1,
    value: 'Knapweed',
  },
  {
    id: -1,
    value: 'Hogweed',
  },
  {
    id: -1,
    value: 'White Clover',
  },
  {
    id: -1,
    value: 'Ragwort',
  },
  {
    id: -1,
    value: 'Thistle',
  },
  {
    id: -1,
    value: 'Ivy',
  },
  {
    id: -1,
    value: 'Other',
  },
];

const flowerCountValues = [
  {
    id: -1,
    value: 'Individual Flower',
    icon: individualFlowerTypeImage,
  },
  {
    id: -1,
    value: 'Head',
    icon: headTypeImage,
  },
  {
    id: -1,
    value: 'Umbel',
    icon: umbelTypeImage,
  },
  {
    id: -1,
    value: 'Spike',
    icon: spikeTypeImage,
  },
];

const flowerPatchValues = [
  {
    id: -1,
    value: 'In a larger patch of the same flower',
  },
  {
    id: -1,
    value: 'In a larger patch of many different flowers',
  },
  {
    id: -1,
    value: 'More or less isolated',
  },
  {
    id: -1,
    value: 'Not recorded',
  },
];

const weatherSkyValues = [
  {
    id: -1,
    value: 'All or mostly blue',
  },
  {
    id: -1,
    value: 'Half blue and half cloud',
  },
  {
    id: -1,
    value: 'All or mostly cloud',
  },
  {
    id: -1,
    value: 'Not recorded',
  },
];

const weatherShadeValues = [
  {
    id: -1,
    value: 'Entirely in sunshine',
  },
  {
    id: -1,
    value: 'Partly in sun and partly shaded',
  },
  {
    id: -1,
    value: 'Entirely shaded',
  },
  {
    id: -1,
    value: 'Not recorded',
  },
];

const weatherWindValues = [
  {
    id: -1,
    value: 'Leaves still/moving occasionally',
  },
  {
    id: -1,
    value: 'Leaves moving gently all the time',
  },
  {
    id: -1,
    value: 'Leaves moving strongly',
  },
  {
    id: -1,
    value: 'Not recorded',
  },
];

const dateTimeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: 'numeric',
  minute: 'numeric',
});

const survey = {
  id: -1,
  name: 'survey',

  SURVEY_STEP_COUNT: 10,

  DEFAULT_SURVEY_TIME: 10,

  attrs: {
    location: {
      id: 'location',
      remote: {
        id: 'entered_sref',
        values(location, submission) {
          const { accuracy, source, gridref } = location;

          const keys = survey.attrs;
          const locationAttributes = {
            [keys.location_source.remote.id]: source,
            [keys.location_gridref.remote.id]: gridref,
            [keys.location_accuracy.remote.id]: accuracy,
          };
          Object.assign(submission.values, locationAttributes);

          const lat = parseFloat(location.latitude);
          const lon = parseFloat(location.longitude);
          return `${lat.toFixed(7)}, ${lon.toFixed(7)}`;
        },
      },
    },

    date: {
      values(date) {
        return dateHelp.print(date);
      },
      isValid: val => val && val.toString() !== 'Invalid Date',
      type: 'date',
      max: () => new Date(),
    },

    surveyStartTime: {
      id: -1,
      values: date => dateTimeFormat.format(new Date(date)),
    },

    habitat: {
      type: 'radio',
      info: (
        <>
          Select <b>habitat</b> that is the best match.
        </>
      ),
      options: habitatValues,
      remote: {
        id: -1,
        values: habitatValues,
      },
    },

    'flower-cover': {
      type: 'radio',
      info: (
        <>
          What is the target flower <b>cover</b>.
        </>
      ),
      options: flowerCoverValues,
      remote: {
        id: -1,
        values: flowerCoverValues,
      },
    },

    flower: {
      type: 'radio',
      options: flowerSelectionValues,
      remote: {
        id: -1,
        values: flowerSelectionValues,
      },
    },

    'flower-manual-entry': {
      label: 'Manual Entry',
      icon: flowerOutline,
      placeholder: 'Enter the species name',
      type: 'textarea',
      skipValueTranslation: true,
    },

    'flower-count': {
      type: 'radio',
      options: flowerCountValues,
      remote: {
        id: -1,
        values: flowerCountValues,
      },
    },

    'flower-count-number': {
      type: 'slider',
      options: flowerSelectionValues,
      max: 200,
      min: 0,
      step: 1,
      skipValueTranslation: true,
    },

    'flower-patch': {
      type: 'radio',
      info: (
        <>
          Is your 50x50cm patch of <b>target flowers</b>:
        </>
      ),
      options: flowerPatchValues,
      remote: {
        id: -1,
        values: flowerPatchValues,
      },
    },

    'weather-sky': {
      type: 'radio',
      info: (
        <>
          What is the <b>sky</b> above your location?
        </>
      ),
      options: weatherSkyValues,
      remote: {
        id: -1,
        values: weatherSkyValues,
      },
    },

    'weather-shade': {
      type: 'radio',
      info: (
        <>
          Was it <b>sun</b> or <b>shade</b> during the count?
        </>
      ),
      options: weatherShadeValues,
      remote: {
        id: -1,
        values: weatherShadeValues,
      },
    },

    'weather-wind': {
      type: 'radio',
      info: (
        <>
          What is the <b>wind</b> strength?
        </>
      ),
      options: weatherWindValues,
      remote: {
        id: -1,
        values: weatherWindValues,
      },
    },
  },

  occ: {
    attrs: {
      taxon: {
        id: 'taxa_taxon_list_id',
        remote: { values: taxon => taxon.warehouse_id },
        count: 0,
      },
    },

    create(Occurrence, taxon) {
      return new Occurrence({
        attrs: {
          taxon,
          count: 0,
        },
      });
    },
  },

  create(Sample, Occurrence) {
    const sample = new Sample({
      metadata: {
        survey: survey.name,
        survey_id: survey.id,
        pausedTime: 0,
      },

      attrs: {
        location: null,
        habitat: null,
        'flower-cover': null,
        flower: null,
        'flower-manual-entry': null,
        'flower-count': null,
        'flower-count-number': 0,
        'flower-patch': null,
        'weather-sky': null,
        'weather-shade': null,
        'weather-wind': null,
      },
    });

    const createOccurrence = insect => {
      const taxon = JSON.parse(JSON.stringify(insect));
      const occ = survey.occ.create(Occurrence, taxon);
      sample.occurrences.push(occ);
    };

    insectGroups.forEach(createOccurrence);

    sample.startGPS();

    return sample;
  },
};

export default survey;
