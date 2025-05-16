/* eslint-disable react/jsx-filename-extension */
import i18n from 'i18next';
import { z } from 'zod';
import { dateFormat } from '@flumens';
import countries from 'common/countries';
import insectGroups from 'common/data';
import flowers from 'common/data/flowers.json';
import habitats from 'common/data/habitats.json';
import flowerIcon from 'common/images/flowerIcon.svg';
import habitatIcon from 'common/images/habitatIcon.svg';
import appModel from 'models/app';
import userModel from 'models/user';
import headTypeImage from './FlowerCount/images/headType.png';
import individualFlowerTypeImage from './FlowerCount/images/individualFlowerType.png';
import spikeTypeImage from './FlowerCount/images/spikeType.png';
import umbelTypeImage from './FlowerCount/images/umbelType.png';
import flowerCoverLargeGroupImage from './FlowerCover/images/groupLarge.png';
import flowerCoverMediumGroupImage from './FlowerCover/images/groupMedium.png';
import flowerCoverSmallGroupImage from './FlowerCover/images/groupSmall.png';

// define types for select values
interface SelectValue {
  id: number | string;
  value: string;
  prefix?: any;
  photo?: string;
  label?: string;
}

// define type for location
interface Location {
  latitude: number;
  longitude: number;
}

const isProd = process.env.NODE_ENV === 'production';

const DEFAULT_SURVEY_TIME = 10 * 60 * 1000; // 10min
const DEV_SURVEY_TIME = 1 * 60 * 1000; // 1min

const fixedLocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const validateLocation = (val: unknown): boolean => {
  const result = fixedLocationSchema.safeParse(val);
  return result.success;
};

export const verifyLocationSchema = z.custom(validateLocation, {
  message: 'Please set a survey location.',
});

const flowerCoverValues: SelectValue[] = [
  {
    id: 13576,
    value: 'Less than half',
    prefix: (
      <img
        src={flowerCoverSmallGroupImage}
        style={{
          width: '60px',
          height: '60px',
          margin: '-5px  0 -5px -10px',
        }}
      />
    ),
  },
  {
    id: 13577,
    value: 'Half of patch',
    prefix: (
      <img
        src={flowerCoverMediumGroupImage}
        style={{
          width: '60px',
          height: '60px',
          margin: '-5px  0 -5px -10px',
        }}
      />
    ),
  },
  {
    id: 13578,
    value: 'More than half of patch',
    prefix: (
      <img
        src={flowerCoverLargeGroupImage}
        style={{
          width: '60px',
          height: '60px',
          margin: '-5px  0 -5px -10px',
        }}
      />
    ),
  },
  {
    id: 13603,
    value: 'Not recorded',
  },
];

const intoSelectValue = (val: any): SelectValue => ({
  ...val,
  id: val.warehouseId,
  photo: val.id,
  value: val.value || val.name,
});

const alphabeticallyWithOtherLast = (
  s1: SelectValue,
  s2: SelectValue
): number => {
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

const flowerSelectionValues: SelectValue[] = flowers.map(intoSelectValue);

const flowerCountValues: SelectValue[] = [
  {
    id: 13579,
    value: 'Individual Flower',
    prefix: (
      <img
        src={individualFlowerTypeImage}
        style={{ width: '60px', height: '60px', margin: '-5px  0 -5px -10px' }}
      />
    ),
  },
  {
    id: 13580,
    value: 'Head',
    prefix: (
      <img
        src={headTypeImage}
        style={{ width: '60px', height: '60px', margin: '-5px  0 -5px -10px' }}
      />
    ),
  },
  {
    id: 13581,
    value: 'Umbel',
    prefix: (
      <img
        src={umbelTypeImage}
        style={{ width: '60px', height: '60px', margin: '-5px  0 -5px -10px' }}
      />
    ),
  },
  {
    id: 13582,
    value: 'Spike',
    prefix: (
      <img
        src={spikeTypeImage}
        style={{ width: '60px', height: '60px', margin: '-5px  0 -5px -10px' }}
      />
    ),
  },
];

const flowerPatchValues: SelectValue[] = [
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

const habitatValues: SelectValue[] = habitats.map(intoSelectValue);

const weatherSkyValues: SelectValue[] = [
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

const weatherShadeValues: SelectValue[] = [
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

const weatherWindValues: SelectValue[] = [
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

  SURVEY_STEP_COUNT: 10,

  DEFAULT_SURVEY_TIME: isProd ? DEFAULT_SURVEY_TIME : DEV_SURVEY_TIME,

  attrs: {
    date: {
      remote: {
        values: (val: any) => dateFormat.format(new Date(val)),
      },
    },
    recorder: {
      remote: { id: 127 },
    },
    location: {
      id: 'location',
      remote: {
        id: 'entered_sref',
        values(location: Location) {
          const lat = parseFloat(location.latitude.toString());
          const lon = parseFloat(location.longitude.toString());
          return `${lat.toFixed(7)}, ${lon.toFixed(7)}`;
        },
      },
    },

    activity: { id: 1759, values: ({ id }: { id: number }) => id },

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
        values: (value: string) => dateTimeFormat.format(new Date(value)),
      },
    },

    habitat: {
      pageProps: {
        attrProps: {
          input: 'radio',
          inputProps: () => {
            const { country } = appModel.data;
            const byCountry = (sp: any) => sp[country];

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
            const { country } = appModel.data;
            const byCountry = (sp: any) => sp[country];

            const getOption = (val: any): SelectValue => ({
              ...val,
              id: val.warehouseId,
              label: val.name,
              prefix:
                val.id !== 'other' ? (
                  <img
                    src={`/images/${val.id}.jpg`}
                    style={{
                      width: '80px',
                      height: '80px',
                      margin: '-15px  0 -15px -20px',
                    }}
                  />
                ) : undefined,
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
          values: (taxon: any) => taxon.warehouseId,
        },
      },
      count: {
        remote: { id: 666 },
      },
    },

    create(Occurrence: any, taxon: any) {
      return new Occurrence({
        data: {
          taxon,
          count: 0,
        },
      });
    },
  },

  create(Sample: any, Occurrence: any) {
    const { country } = appModel.data;

    const sample = new Sample({
      metadata: {
        pausedTotalTime: 0, // ms
        pausedStartTime: null,
      },
      data: {
        date: new Date().toISOString(),
        enteredSrefSystem: 4326,
        surveyId: survey.id,
        privacy_precision: 1000,
        recorder: userModel.data.fullName,
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

    const createOccurrence = (insect: any) => {
      const taxon = JSON.parse(JSON.stringify(insect));
      const occ = survey.occ.create(Occurrence, taxon);
      sample.occurrences.push(occ);
    };

    const byCountry = (sp: any) => sp[country];
    insectGroups.filter(byCountry).forEach(createOccurrence);

    sample.startVibrateCounter();
    sample.startGPS();

    return sample;
  },

  verify(_: any, sample: any) {
    try {
      const sampleSchema = z.object({
        media: z
          .array(z.any())
          .min(1, { message: 'Please add at least 1 photo.' }),
        data: z
          .object({
            location: verifyLocationSchema,
            habitat: z.string(),
            'habitat-manual-entry': z.string().nullable(),
            flower: z.string(),
            'flower-manual-entry': z.string().nullable(),
            'flower-count-number': z
              .number()
              .min(1, { message: 'Flower number is a required field.' }),
            'flower-count': z
              .string()
              .nullable()
              .refine(val => val !== null && val !== '', {
                message: 'Flower type is a required field.',
              }),
          })
          .superRefine((data, ctx) => {
            // check if habitat is 'Other' and manual entry is empty
            if (
              data.habitat === 'Other' &&
              (!data['habitat-manual-entry'] ||
                data['habitat-manual-entry'] === '')
            ) {
              ctx.addIssue({
                path: ['habitat-manual-entry'],
                code: z.ZodIssueCode.custom,
                message: 'Habitat "Other" is a required field.',
              });
            }

            // check if flower is 'Other' and manual entry is empty
            if (
              data.flower === 'Other' &&
              (!data['flower-manual-entry'] ||
                data['flower-manual-entry'] === '')
            ) {
              ctx.addIssue({
                path: ['flower-manual-entry'],
                code: z.ZodIssueCode.custom,
                message: 'Flower "Other" is a required field.',
              });
            }
          }),
      });

      sampleSchema.parse(sample);
    } catch (attrError) {
      return attrError;
    }
    return null;
  },
};

export default survey;
