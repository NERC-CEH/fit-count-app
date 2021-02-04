const habitatValues = [];

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
      label: 'habitat',
      options: habitatValues,
      remote: {
        id: -1,
        values: habitatValues,
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
      },
    });

    sample.startGPS();

    return sample;
  },
};

export default survey;
