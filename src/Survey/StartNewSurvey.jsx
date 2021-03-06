import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { NavContext } from '@ionic/react';
import Sample from 'models/sample';
import { alert } from '@apps';
import { Trans as T } from 'react-i18next';
import appModel from 'models/app';
import userModel from 'models/user';
import Occurrence from 'models/occurrence';
import savedSamples from 'models/savedSamples';

async function showDraftAlert() {
  const alertWrap = resolve => {
    alert({
      header: 'Draft',
      message: (
        <T>Previous survey draft exists, would you like to continue it?</T>
      ),
      backdropDismiss: false,
      buttons: [
        {
          text: 'Discard',
          handler: () => {
            resolve(false);
          },
        },
        {
          text: 'Continue',
          cssClass: 'primary',
          handler: () => {
            resolve(true);
          },
        },
      ],
    });
  };
  return new Promise(alertWrap);
}

async function getNewSample(survey, draftIdKey) {
  const sample = await survey.create(Sample, Occurrence);
  await sample.save();

  savedSamples.push(sample);
  appModel.attrs[draftIdKey] = sample.cid;
  await appModel.save();

  return sample;
}

async function getDraft(draftIdKey) {
  const draftID = appModel.attrs[draftIdKey];
  if (draftID) {
    const byId = ({ cid }) => cid === draftID;
    const draftSample = savedSamples.find(byId);
    if (draftSample) {
      const continueDraftRecord = await showDraftAlert();
      if (continueDraftRecord) {
        return draftSample;
      }

      draftSample.destroy();
    }
  }

  return null;
}

function StartNewSurvey({ match, survey, location }) {
  const context = useContext(NavContext);

  const draftIdKey = `draftId:${survey.name}`;

  const pickDraftOrCreateSampleWrap = () => {
    // eslint-disable-next-line
    (async () => {
      if (!userModel.hasLogIn()) {
        context.navigate(`/user/register`, 'none', 'replace');
        return;
      }

      let sample = await getDraft(draftIdKey);
      if (!sample) {
        sample = await getNewSample(survey, draftIdKey, location.search);
      }

      const url = `${match.url}/${sample.cid}/location`;
      context.navigate(url, 'none', 'replace');
    })();
  };

  useEffect(pickDraftOrCreateSampleWrap, [match.url]);

  return null;
}

StartNewSurvey.propTypes = exact({
  match: PropTypes.object.isRequired,
  survey: PropTypes.object.isRequired,
  history: PropTypes.any.isRequired,
  location: PropTypes.any,
  staticContext: PropTypes.any,
});

// eslint-disable-next-line @getify/proper-arrows/name
StartNewSurvey.with = survey => {
  const StartNewSurveyWrap = params => (
    <StartNewSurvey survey={survey} {...params} />
  );

  return StartNewSurveyWrap;
};

export default StartNewSurvey;
