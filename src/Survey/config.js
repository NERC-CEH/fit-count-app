/* eslint-disable react/jsx-filename-extension */
import * as Yup from 'yup';
import { date } from '@flumens';
import userModel from 'models/user';
import appModel from 'models/app';
import i18n from 'i18next';
import insectGroups from 'common/data';
import countries from 'common/countries';
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

const DEFAULT_SURVEY_TIME = 1 * 10 * 1000; // 10min
const DEV_SURVEY_TIME = 1 * 10 * 1000; // 1min

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
  'Please set a survey location.',
  validateLocation
);

const flowerCoverValues = [
  {
    id: 13576,
    value: 'Less than half',
    icon: flowerCoverSmallGroupImage,
  },
  {
    id: 13577,
    value: 'Half of patch',
    icon: flowerCoverMediumGroupImage,
  },
  {
    id: 13578,
    value: 'More than half of patch',
    icon: flowerCoverLargeGroupImage,
  },
  {
    id: 13603,
    value: 'Not recorded',
  },
];

const intoSelectValue = val => ({
  ...val,
  id: val.warehouseId,
  photo: val.id,
  value: val.value || val.name,
});

const alphabeticallyWithOtherLast = (s1, s2) => {
  if (s1.value === 'Other') {
    return 1;
  }

  if (s2.value === 'Other') {
    return -1;
  }

  const translated1 = i18n.t(s1.value);
  const translated2 = i18n.t(s2.value);
  return translated1.localeCompare(translated2);
};

const flowerSelectionValues = flowers.map(intoSelectValue);

const flowerCountValues = [
  {
    id: 13579,
    value: 'Individual Flower',
    icon: individualFlowerTypeImage,
  },
  {
    id: 13580,
    value: 'Head',
    icon: headTypeImage,
  },
  {
    id: 13581,
    value: 'Umbel',
    icon: umbelTypeImage,
  },
  {
    id: 13582,
    value: 'Spike',
    icon: spikeTypeImage,
  },
];

const flowerPatchValues = [
  {
    id: 13583,
    value: 'In a larger patch of the same flower',
  },
  {
    id: 13584,
    value: 'In a larger patch of many different flowers',
  },
  {
    id: 13585,
    value: 'More or less isolated',
  },
  {
    id: 13604,
    value: 'Not recorded',
  },
];

const habitatValues = habitats.map(intoSelectValue);

const weatherSkyValues = [
  {
    id: 13586,
    value: 'All or mostly blue',
  },
  {
    id: 13587,
    value: 'Half blue and half cloud',
  },
  {
    id: 13588,
    value: 'All or mostly cloud',
  },
  {
    id: 13605,
    value: 'Not recorded',
  },
];

const weatherShadeValues = [
  {
    id: 13750,
    value: 'Entirely in sunshine',
  },
  {
    id: 13751,
    value: 'Partly in sun and partly shaded',
  },
  {
    id: 13752,
    value: 'Entirely shaded',
  },
  {
    id: 13753,
    value: 'Not recorded',
  },
];

const weatherWindValues = [
  {
    id: 13589,
    value: 'Leaves still/moving occasionally',
  },
  {
    id: 13590,
    value: 'Leaves moving gently all the time',
  },
  {
    id: 13591,
    value: 'Leaves moving strongly',
  },
  {
    id: 13606,
    value: 'Not recorded',
  },
];

const dateTimeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: 'numeric',
  minute: 'numeric',
});

const survey = {
  id: 641,
  name: 'survey',

  SURVEY_STEP_COUNT: 11,

  DEFAULT_SURVEY_TIME: isProd ? DEFAULT_SURVEY_TIME : DEV_SURVEY_TIME,

  attrs: {
    date: {
      remote: {
        values: d => date.print(d, false),
      },
    },
    recorder: {
      remote: { id: 127 },
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

    activity: {
      values(activityValue, submission) {
        const activityList = appModel.attrs.activities.length;
        if (!activityList) return;

        const activityID = [...appModel.attrs.activities].find(
          activity => activity.name === activityValue
        ).id;

        // set past activity
        appModel.attrs.pastActivity = activityID;
        appModel.save();

        // eslint-disable-next-line
        submission.values = {
          ...submission.values,
        };

        // eslint-disable-next-line no-param-reassign
        submission.values['smpAttr:1759'] = activityID;
      },
    },

    'location-name': {
      pageProps: {
        attrProps: {
          input: 'input',
          inputProps: {
            placeholder: 'Site name eg nearby village',
          },
        },
      },
      remote: { id: 'location_name' },
    },

    country: {
      remote: { id: 1640, values: countries.map(intoSelectValue) },
    },

    surveyStartTime: {
      remote: {
        id: 1056,
        values: value => dateTimeFormat.format(new Date(value)),
      },
    },

    habitat: {
      pageProps: {
        attrProps: {
          input: 'radio',
          inputProps: () => {
            const { country } = appModel.attrs;
            const byCountry = sp => sp[country];

            const options = habitats
              .filter(byCountry)
              .map(intoSelectValue)
              .sort(alphabeticallyWithOtherLast);

            return { options };
          },
        },
      },
      remote: { id: 1048, values: habitatValues },
    },

    'habitat-manual-entry': {
      menuProps: { label: 'Other habitat', icon: habitatIcon },
      pageProps: {
        headerProps: { title: 'Other habitat' },
        attrProps: {
          input: 'textarea',
          info: 'Please type in the name of the habitat you have chosen then go back to the habitat page',
          inputProps: { placeholder: 'Other habitat' },
        },
      },
      remote: { id: 1049 },
    },

    'flower-cover': {
      pageProps: {
        attrProps: {
          input: 'radio',
          inputProps: { options: flowerCoverValues },
        },
      },
      remote: {
        id: 1052,
        values: flowerCoverValues,
      },
    },

    flower: {
      pageProps: {
        attrProps: {
          input: 'radio',
          inputProps: () => {
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

            const countryFlowers = flowers
              .filter(byCountry)
              .map(getOption)
              .sort(alphabeticallyWithOtherLast);
            return { options: countryFlowers };
          },
        },
      },

      remote: {
        id: 1050,
        values: flowerSelectionValues, // must be full array for all countries
      },
    },

    'flower-manual-entry': {
      menuProps: { label: 'Other flower name', icon: flowerIcon },
      pageProps: {
        headerProps: { title: 'Other flower name' },
        attrProps: {
          input: 'textarea',
          info: 'Please type in the name of the target flower you have chosen then go back to the target flower page',
          inputProps: { placeholder: 'Other flower name' },
        },
      },
      remote: {
        id: 1051,
      },
    },

    'flower-count': {
      pageProps: {
        attrProps: {
          input: 'radio',
          inputProps: { options: flowerCountValues },
        },
      },
      remote: {
        id: 1054,
        values: flowerCountValues,
      },
    },

    'flower-count-number': {
      pageProps: {
        attrProps: {
          input: 'slider',
          inputProps: {
            max: 3000,
            min: 0,
            step: 1,
          },
        },
      },
      remote: {
        id: 1053,
      },
    },

    'flower-patch': {
      pageProps: {
        attrProps: {
          input: 'radio',
          inputProps: { options: flowerPatchValues },
        },
      },
      remote: {
        id: 1055,
        values: flowerPatchValues,
      },
    },

    'weather-sky': {
      pageProps: {
        attrProps: {
          input: 'radio',
          inputProps: { options: weatherSkyValues },
        },
      },
      remote: {
        id: 1057,
        values: weatherSkyValues,
      },
    },

    'weather-shade': {
      pageProps: {
        attrProps: {
          input: 'radio',
          inputProps: { options: weatherShadeValues },
        },
      },
      remote: {
        id: 1061,
        values: weatherShadeValues,
      },
    },

    'weather-wind': {
      pageProps: {
        attrProps: {
          input: 'radio',
          inputProps: { options: weatherWindValues },
        },
      },
      remote: {
        id: 1058,
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
        remote: { id: 666 },
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
    const { country } = appModel.attrs;

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
        country,
      },
    });

    const createOccurrence = insect => {
      const taxon = JSON.parse(JSON.stringify(insect));
      const occ = survey.occ.create(Occurrence, taxon);
      sample.occurrences.push(occ);
    };

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
