/* eslint-disable react/jsx-filename-extension */
import * as Yup from 'yup';
import { date } from '@apps';
import userModel from 'models/user';
import appModel from 'models/app';
import insectGroups from 'common/data';
import habitats from 'common/data/habitats.json';
import flowers from 'common/data/flowers.json';
import habitatIcon from 'common/images/habitatIcon.svg';
import flowerIcon from 'common/images/flowerIcon.svg';

import flowerCoverLargeGroupImage from './FlowerCover/images/groupLarge.png';
import flowerCoverMediumGroupImage from './FlowerCover/images/groupMedium.png';
import flowerCoverSmallGroupImage from './FlowerCover/images/groupSmall.png';

import individualFlowerTypeImage from './FlowerCount/images/individualFlowerType.png';
import headTypeImage from './FlowerCount/images/headType.png';
import umbelTypeImage from './FlowerCount/images/umbelType.png';
import spikeTypeImage from './FlowerCount/images/spikeType.png';

const isProd = process.env.NODE_ENV === 'production';

const DEFAULT_SURVEY_TIME = 10 * 60 * 1000; // 10min
const DEV_SURVEY_TIME = 1 * 60 * 1000; // 1min

const fixedLocationSchema = Yup.object().shape({
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
});

const validateLocation = val => {
  try {
    fixedLocationSchema.validateSync(val);
    return true;
  } catch (e) {
    return false;
  }
};

export const verifyLocationSchema = Yup.mixed().test(
  'location',
  validateLocation
);

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

const intoSelectValue = val => ({
  ...val,
  id: val.warehouseId,
  photo: val.id,
});

const flowerSelectionValues = flowers.map(intoSelectValue);

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

const habitatValues = habitats.map(intoSelectValue);

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

  DEFAULT_SURVEY_TIME: isProd ? DEFAULT_SURVEY_TIME : DEV_SURVEY_TIME,

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
      componentProps: {
        options: habitatValues,
      },
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
      componentProps: {
        placeholder: 'Other habitat',
      },
      type: 'textarea',
      remote: {
        id: isProd ? 1049 : 1509,
      },
    },

    'flower-cover': {
      type: 'radio',
      componentProps: {
        options: flowerCoverValues,
      },
      remote: {
        id: isProd ? 1052 : 1512,
        values: flowerCoverValues,
      },
    },

    flower: {
      type: 'radio',
      componentProps() {
        // country specific options only
        const { country } = appModel.attrs;
        const byCountry = sp => sp[country];
        const getOption = val => ({
          ...val,
          id: val.warehouseId,
          label: val.name,
          icon: val.id !== 'other' && `/images/${val.id}.jpg`,
          value: val.name,
        });
        const countryFlowers = flowers.filter(byCountry).map(getOption);
        return { options: countryFlowers };
      },
      remote: {
        id: 1050,
        values: flowerSelectionValues, // must be full array for all countries
      },
    },

    'flower-manual-entry': {
      type: 'textarea',
      label: 'Other flower name',
      icon: flowerIcon,
      info:
        'Please type in the name of the target flower you have chosen then go back to the target flower page',
      componentProps: {
        placeholder: 'Other flower name',
      },
      remote: {
        id: isProd ? 1051 : 1511,
      },
    },

    'flower-count': {
      type: 'radio',
      componentProps: {
        options: flowerCountValues,
      },
      remote: {
        id: isProd ? 1054 : 1514,
        values: flowerCountValues,
      },
    },

    'flower-count-number': {
      type: 'slider',
      componentProps: {
        max: 3000,
        min: 0,
        step: 1,
      },
      skipValueTranslation: true,
      remote: {
        id: isProd ? 1053 : 1513,
      },
    },

    'flower-patch': {
      type: 'radio',
      componentProps: {
        options: flowerPatchValues,
      },
      remote: {
        id: isProd ? 1055 : 1515,
        values: flowerPatchValues,
      },
    },

    'weather-sky': {
      type: 'radio',
      componentProps: {
        options: weatherSkyValues,
      },
      remote: {
        id: isProd ? 1057 : 1517,
        values: weatherSkyValues,
      },
    },

    'weather-shade': {
      type: 'radio',
      componentProps: {
        options: weatherShadeValues,
      },
      remote: {
        id: isProd ? 1061 : 1519,
        values: weatherShadeValues,
      },
    },

    'weather-wind': {
      type: 'radio',
      componentProps: {
        options: weatherWindValues,
      },
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
        privacy_precision: 1000,
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

    const { country } = appModel.attrs;
    const byCountry = sp => sp[country];
    insectGroups.filter(byCountry).forEach(createOccurrence);

    sample.startVibrateCounter();
    sample.startGPS();

    return sample;
  },

  verify(_, sample) {
    try {
      const sampleSchema = Yup.object().shape({
        media: Yup.array().min(1, 'Please add at least 1 photo.').required(),

        attrs: Yup.object().shape({
          location: verifyLocationSchema,

          'habitat-manual-entry': Yup.string().when('habitat', {
            is: val => val === 'Other',
            then: Yup.string()
              .nullable()
              .required('Habitat "Other" is a required field.'),
            otherwise: Yup.string().nullable(),
          }),

          'flower-manual-entry': Yup.string().when('flower', {
            is: val => val === 'Other',
            then: Yup.string()
              .nullable()
              .required('Flower "Other" is a required field.'),
            otherwise: Yup.string().nullable(),
          }),

          'flower-count-number': Yup.number()
            .min(1, 'Flower number is a required field.')
            .required(),

          'flower-count': Yup.string()
            .nullable()
            .required('Flower type is a required field.'),
        }),
      });

      sampleSchema.validateSync(sample, { abortEarly: false });
    } catch (attrError) {
      return attrError;
    }
    return null;
  },
};

export default survey;
