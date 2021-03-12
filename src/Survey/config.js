/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { date } from '@apps';
import userModel from 'models/user';
import insectGroups from 'common/data';
import habitatIcon from 'common/images/habitatIcon.svg';
import flowerIcon from 'common/images/flowerIcon.svg';

import flowerCoverLargeGroupImage from './FlowerCover/images/groupLarge.png';
import flowerCoverMediumGroupImage from './FlowerCover/images/groupMedium.png';
import flowerCoverSmallGroupImage from './FlowerCover/images/groupSmall.png';

import individualFlowerTypeImage from './FlowerCount/images/individualFlowerType.png';
import headTypeImage from './FlowerCount/images/headType.png';
import umbelTypeImage from './FlowerCount/images/umbelType.png';
import spikeTypeImage from './FlowerCount/images/spikeType.png';

import bramble from './Flower/images/bramble.jpg';
import buddleja from './Flower/images/buddleja.jpg';
import buttercup from './Flower/images/buttercup.jpg';
import dandelion from './Flower/images/dandelion.jpg';
import hawthorn from './Flower/images/hawthorn.jpg';
import heather from './Flower/images/heather.jpg';
import hogweed from './Flower/images/hogweed.jpg';
import ivy from './Flower/images/ivy.jpg';
import knapweed from './Flower/images/knapweed.jpg';
import lavender from './Flower/images/lavender.jpg';
import ragwort from './Flower/images/ragwort.jpg';
import thistle from './Flower/images/thistle.jpg';
import whiteClover from './Flower/images/whiteClover.jpg';
import whiteDeadNettle from './Flower/images/whiteWeadNettle.jpg';

const isProd = process.env.NODE_ENV === 'production';

const habitatValues = [
  {
    id: isProd ? 13557 : 17828,
    value: 'Garden',
  },
  {
    id: isProd ? 13558 : 17829,
    value: 'School Grounds',
  },
  {
    id: isProd ? 13559 : 17830,
    value: 'Parkland with trees',
  },
  {
    id: isProd ? 13560 : 17831,
    value: 'Churchyard',
  },
  {
    id: isProd ? 13561 : 17832,
    value: 'Grassy verge or hedgerow edge',
  },
  {
    id: isProd ? 13562 : 17833,
    value: 'Grassland with wild flowers (e.g. meadow)',
  },
  {
    id: isProd ? 13563 : 17834,
    value: 'Amenity grassland (usually mown short)',
  },
  { id: isProd ? 13564 : 17835, value: 'Farm crops or grassy pasture' },
  { id: isProd ? 13565 : 17836, value: 'Upland moorland' },
  { id: isProd ? 13566 : 17837, value: 'Lowland heath' },
  { id: isProd ? 13567 : 17838, value: 'Waste ground or brownfield site' },
  { id: isProd ? 13568 : 17839, value: 'Woodland' },
  { id: isProd ? 13569 : 17840, value: 'Other' },
];

const flowerCoverValues = [
  {
    id: isProd ? 13576 : 17856,
    value: 'Less than half',
    icon: flowerCoverSmallGroupImage,
  },
  {
    id: isProd ? 13577 : 17857,
    value: 'Half of patch',
    icon: flowerCoverMediumGroupImage,
  },
  {
    id: isProd ? 13578 : 17858,
    value: 'More than half of patch',
    icon: flowerCoverLargeGroupImage,
  },
  {
    id: isProd ? 13603 : 17859,
    value: 'Not recorded',
  },
];

const flowerSelectionValues = [
  {
    id: isProd ? 13571 : 17841,
    value: 'Bramble',
    icon: bramble,
    type: 'Individual Flower',
  },
  {
    id: isProd ? 13607 : 17842,
    value: 'Buddleja',
    icon: buddleja,
    type: 'Spike',
  },
  {
    id: isProd ? 13608 : 17846,
    value: 'Heather',
    icon: heather,
    type: 'Spike',
  },
  {
    id: isProd ? 13570 : 17844,
    value: 'Dandelion',
    icon: dandelion,
    type: 'Head',
  },
  {
    id: isProd ? 14100 : 17843,
    value: 'Buttercup',
    icon: buttercup,
    type: 'Individual Flower',
  },
  {
    id: isProd ? 13574 : 17854,
    value: 'White Dead-nettle',
    icon: whiteDeadNettle,
    type: 'Spike',
  },
  {
    id: isProd ? 13572 : 17845,
    value: 'Hawthorn',
    icon: hawthorn,
    type: 'Individual Flower',
  },
  {
    id: isProd ? 13611 : 17850,
    value: 'Lavender',
    icon: lavender,
    type: 'Spike',
  },
  {
    id: isProd ? 13610 : 17849,
    value: 'Knapweed',
    icon: knapweed,
    type: 'Head',
  },
  {
    id: isProd ? 13609 : 17847,
    value: 'Hogweed',
    icon: hogweed,
    type: 'Umbel',
  },
  {
    id: isProd ? 13573 : 17853,
    value: 'White Clover',
    icon: whiteClover,
    type: 'Head',
  },
  {
    id: isProd ? 13612 : 17851,
    value: 'Ragwort',
    icon: ragwort,
    type: 'Head',
  },
  {
    id: isProd ? 13613 : 17852,
    value: 'Thistle',
    icon: thistle,
    type: 'Head',
  },
  {
    id: isProd ? 14064 : 17848,
    value: 'Ivy',
    icon: ivy,
    type: 'Head',
  },
  {
    id: isProd ? 13575 : 17855,
    value: 'Other',
  },
];

const flowerCountValues = [
  {
    id: isProd ? 13579 : 17860,
    value: 'Individual Flower',
    icon: individualFlowerTypeImage,
  },
  {
    id: isProd ? 13580 : 17861,
    value: 'Head',
    icon: headTypeImage,
  },
  {
    id: isProd ? 13581 : 17862,
    value: 'Umbel',
    icon: umbelTypeImage,
  },
  {
    id: isProd ? 13582 : 17863,
    value: 'Spike',
    icon: spikeTypeImage,
  },
];

const flowerPatchValues = [
  {
    id: isProd ? 13583 : 17864,
    value: 'In a larger patch of the same flower',
  },
  {
    id: isProd ? 13584 : 17865,
    value: 'In a larger patch of many different flowers',
  },
  {
    id: isProd ? 13585 : 17866,
    value: 'More or less isolated',
  },
  {
    id: isProd ? 13604 : 17867,
    value: 'Not recorded',
  },
];

const weatherSkyValues = [
  {
    id: isProd ? 13586 : 17868,
    value: 'All or mostly blue',
  },
  {
    id: isProd ? 13587 : 17869,
    value: 'Half blue and half cloud',
  },
  {
    id: isProd ? 13588 : 17870,
    value: 'All or mostly cloud',
  },
  {
    id: isProd ? 13605 : 17871,
    value: 'Not recorded',
  },
];

const weatherShadeValues = [
  {
    id: isProd ? 13750 : 17876,
    value: 'Entirely in sunshine',
  },
  {
    id: isProd ? 13751 : 17877,
    value: 'Partly in sun and partly shaded',
  },
  {
    id: isProd ? 13752 : 17878,
    value: 'Entirely shaded',
  },
  {
    id: isProd ? 13753 : 17879,
    value: 'Not recorded',
  },
];

const weatherWindValues = [
  {
    id: isProd ? 13589 : 17872,
    value: 'Leaves still/moving occasionally',
  },
  {
    id: isProd ? 13590 : 17873,
    value: 'Leaves moving gently all the time',
  },
  {
    id: isProd ? 13591 : 17874,
    value: 'Leaves moving strongly',
  },
  {
    id: isProd ? 13606 : 17875,
    value: 'Not recorded',
  },
];

const dateTimeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: 'numeric',
  minute: 'numeric',
});

const survey = {
  id: isProd ? 641 : 599,
  name: 'survey',

  SURVEY_STEP_COUNT: 10,

  DEFAULT_SURVEY_TIME: 1 * 60 * 1000, // 10 min

  attrs: {
    date: {
      remote: {
        values: d => date.print(d, false),
      },
    },
    recorder: {
      remote: {
        id: 127,
      },
    },
    location: {
      id: 'location',
      remote: {
        id: 'entered_sref',
        values(location) {
          const lat = parseFloat(location.latitude);
          const lon = parseFloat(location.longitude);
          return `${lat.toFixed(7)}, ${lon.toFixed(7)}`;
        },
      },
    },

    surveyStartTime: {
      remote: {
        id: isProd ? 1056 : 1516,
        values: value => dateTimeFormat.format(new Date(value)),
      },
    },

    habitat: {
      type: 'radio',
      options: habitatValues,
      remote: {
        id: isProd ? 1048 : 1508,
        values: habitatValues,
      },
    },
    'habitat-manual-entry': {
      label: 'Other habitat',
      icon: habitatIcon,
      info:
        'Please type in the name of the habitat you have chosen then go back to the habitat page',
      placeholder: 'Other habitat',
      type: 'textarea',
      remote: {
        id: isProd ? 1049 : 1509,
      },
    },

    'flower-cover': {
      type: 'radio',
      options: flowerCoverValues,
      remote: {
        id: isProd ? 1052 : 1512,
        values: flowerCoverValues,
      },
    },

    flower: {
      type: 'radio',
      options: flowerSelectionValues,
      remote: {
        id: isProd ? 1050 : 1510,
        values: flowerSelectionValues,
      },
    },

    'flower-manual-entry': {
      label: 'Other flower name',
      icon: flowerIcon,
      info:
        'Please type in the name of the target flower you have chosen then go back to the target flower page',
      placeholder: 'Other flower name',
      type: 'textarea',
      skipValueTranslation: true,
      remote: {
        id: isProd ? 1051 : 1511,
      },
    },

    'flower-count': {
      type: 'radio',
      options: flowerCountValues,
      remote: {
        id: isProd ? 1054 : 1514,
        values: flowerCountValues,
      },
    },

    'flower-count-number': {
      type: 'slider',
      max: 3000,
      min: 0,
      step: 1,
      skipValueTranslation: true,
      remote: {
        id: isProd ? 1053 : 1513,
      },
    },

    'flower-patch': {
      type: 'radio',
      options: flowerPatchValues,
      remote: {
        id: isProd ? 1055 : 1515,
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
        id: isProd ? 1057 : 1517,
        values: weatherSkyValues,
      },
    },

    'weather-shade': {
      type: 'radio',
      info: (
        <>
          How much <b>sun</b> fell on your patch during the FIT Count; was it:
        </>
      ),
      options: weatherShadeValues,
      remote: {
        id: isProd ? 1061 : 1519,
        values: weatherShadeValues,
      },
    },

    'weather-wind': {
      type: 'radio',
      info: (
        <>
          What was the <b>wind</b> strength?
        </>
      ),
      options: weatherWindValues,
      remote: {
        id: isProd ? 1058 : 1518,
        values: weatherWindValues,
      },
    },
  },

  occ: {
    attrs: {
      taxon: {
        remote: {
          id: 'taxa_taxon_list_id',
          values: taxon => taxon.warehouseId,
        },
      },
      count: {
        remote: {
          id: isProd ? 666 : 841,
        },
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
        pausedTotalTime: 0, // ms
        pausedStartTime: null,
      },

      attrs: {
        recorder: userModel.attrs.fullName,
        surveyStartTime: null,
        location: null,
        habitat: null,
        'habitat-manual-entry': null,
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

    sample.startVibrateCounter();
    sample.startGPS();

    return sample;
  },
};

export default survey;
