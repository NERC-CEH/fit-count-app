import { useEffect, useContext } from 'react';
import { NavContext, isPlatform } from '@ionic/react';
import Sample from 'models/sample';
import { useAlert } from '@flumens';
import { Trans as T } from 'react-i18next';
import appModel from 'models/app';
import userModel from 'models/user';
import Occurrence from 'models/occurrence';
import savedSamples from 'models/savedSamples';

async function showDraftAlert(alert: any) {
  const alertWrap = (resolve: any) => {
    alert({
      header: 'Draft',
      message: (
        <T>Previous survey draft exists, would you like to continue it?</T>
      ),
      backdropDismiss: false,
      buttons: [
        {
          text: 'Discard',
          role: 'destructive',
          handler: () => {
            resolve(false);
          },
        },
        {
          text: 'Continue',
          handler: () => {
            resolve(true);
          },
        },
      ],
    });
  };
  return new Promise(alertWrap);
}

async function getNewSample(survey: any, draftIdKey: string) {
  const sample = await survey.create(Sample, Occurrence);
  await sample.save();

  savedSamples.push(sample);
  (appModel.attrs as any)[draftIdKey] = sample.cid;
  await appModel.save();

  return sample;
}

async function getDraft(draftIdKey: string, alert: any) {
  const draftID = (appModel.attrs as any)[draftIdKey];
  if (draftID) {
    const byId = ({ cid }: any) => cid === draftID;
    const draftSample = savedSamples.find(byId);
    if (draftSample) {
      const continueDraftRecord = await showDraftAlert(alert);
      if (continueDraftRecord) {
        return draftSample;
      }

      draftSample.destroy();
    }
  }

  return null;
}

function StartNewSurvey({ match, survey }: any) {
  const context = useContext(NavContext);
  const alert = useAlert();

  const draftIdKey = `draftId:${survey.name}`;

  const pickDraftOrCreateSampleWrap = () => {
    // eslint-disable-next-line
    (async () => {
      const isDemoAppTranslator = !isPlatform('hybrid'); // allow translators to skip login
      if (!userModel.isLoggedIn() && !isDemoAppTranslator) {
        context.navigate(`/user/register`, 'none', 'replace');
        return;
      }

      let sample = await getDraft(draftIdKey, alert);
      if (!sample) {
        sample = await getNewSample(survey, draftIdKey);
      }

      const url = `${match.url}/${sample.cid}/location`;
      context.navigate(url, 'none', 'replace');
    })();
  };

  useEffect(pickDraftOrCreateSampleWrap, [match.url]);

  return null;
}

// eslint-disable-next-line @getify/proper-arrows/name
StartNewSurvey.with = (survey: any) => {
  const StartNewSurveyWrap = (params: any) => (
    <StartNewSurvey survey={survey} {...params} />
  );

  return StartNewSurveyWrap;
};

export default StartNewSurvey;