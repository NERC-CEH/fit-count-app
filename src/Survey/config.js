import img1 from './FlowerCover/images/Group.png';
import img2 from './FlowerCover/images/Group2.png';
import img3 from './FlowerCover/images/Group3.png';

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
    id: 0,
    value: 'Less than half of 50x50cm patch',
    background: img3,
  },
  {
    id: 1,
    value: 'Half of path',
    background: img2,
  },
  {
    id: 2,
    value: 'More than half of path',
    background: img1,
  },
  {
    id: 1,
    value: 'Not recorded',
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
      id: 'habitat',
      type: 'radio',
      options: habitatValues,
      remote: {
        id: -1,
        values: habitatValues,
      },
    },

    'flower-cover': {
      id: 'flower-cover',
      options: flowerCoverValues,
      remote: {
        id: -1,
        values: flowerCoverValues,
      },
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
      },
    });

    sample.startGPS();

    return sample;
  },
};

export default survey;
