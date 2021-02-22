/* eslint-disable react/jsx-filename-extension */
import React from 'react';
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

const survey = {
  id: -1,
  name: 'survey',

  SURVEY_STEP_COUNT: 11,

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
      placeholder: 'Todo:',
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
  },

  create(Sample) {
    const sample = new Sample({
      metadata: {
        survey: survey.name,
        survey_id: survey.id,
      },

      attrs: {
        location: null,
        habitat: null,
        'flower-cover': null,
        flower: null,
        'flower-manual-entry': null,
        'flower-count': null,
        'flower-count-number': 0,
      },
    });

    sample.startGPS();

    return sample;
  },
};

export default survey;
