import {
  Sample,
  SampleAttrs,
  SampleOptions,
  getDeepErrorMessage,
  device,
  useAlert,
} from '@flumens';
import config from 'common/config';
import { Activity } from 'models/app';
import userModel from 'models/user';
import surveyConfig from 'Survey/config';
import Media from './media';
import Occurrence from './occurrence';
import GPSExtension from './sampleGPSExt';
import VibrateExtension from './sample_vibrate_ext';
import { modelStore } from './store';

type Attrs = SampleAttrs & {
  date: any;
  location: any;
  country: string;
  activity?: Activity;
  surveyStartTime?: any;
  'weather-wind'?: any;
  'location-name'?: any;
};

class AppSample extends Sample {
  static fromJSON(json: any) {
    return super.fromJSON(json, Occurrence, AppSample, Media);
  }

  store = modelStore;

  attrs: Attrs = this.attrs;

  gpsExtensionInit: any; // from extension

  startGPS: any; // from extension

  stopGPS: any; // from extension

  isGPSRunning: any; // from extension

  constructor(props: SampleOptions) {
    super(props);
    this.remote.url = `${config.backend.indicia.url}/index.php/services/rest`;
    // eslint-disable-next-line
    this.remote.headers = async () => ({
      Authorization: `Bearer ${await userModel.getAccessToken()}`,
    });

    Object.assign(this, GPSExtension);
    Object.assign(this, VibrateExtension);
    this.survey = surveyConfig;

    this.gpsExtensionInit();
  }

  destroy(silent?: boolean) {
    this.cleanUp();
    return super.destroy(silent);
  }

  cleanUp() {
    this.stopGPS();
  }

  hasCountdownTimedOut = (threshold = 0) => {
    if (!this.attrs.surveyStartTime) {
      return false;
    }

    const startTime = new Date(this.attrs.surveyStartTime);

    const countdown =
      startTime.getTime() +
      this.getSurvey().DEFAULT_SURVEY_TIME +
      this.metadata.pausedTotalTime;

    const timeLeft = (countdown - Date.now()) / 60;

    return timeLeft <= threshold;
  };

  hasCountdown2MinutesLeft = () => {
    return this.hasCountdownTimedOut(2000);
  };

  getInsectCount = () => {
    const hasAbundance = (occ: Occurrence) => occ.attrs.count;
    const addUpOccurrencesCounts = (acc: number, occ: Occurrence) =>
      acc + occ.attrs.count;

    return this.occurrences
      .filter(hasAbundance)
      .reduce(addUpOccurrencesCounts, 0);
  };

  shouldUseActivities = () => this.attrs.country === 'UK';

  getSurveyStepCount = () => {
    const { SURVEY_STEP_COUNT } = this.getSurvey();
    const needsLocationName =
      !this.attrs.location?.latitude || this.attrs['location-name'];

    let count = needsLocationName ? SURVEY_STEP_COUNT + 1 : SURVEY_STEP_COUNT;

    if (this.shouldUseActivities()) count++;

    return count;
  };

  async upload() {
    if (this.remote.synchronising || this.isUploaded()) return true;

    const invalids = this.validateRemote();
    if (invalids) return false;

    if (!device.isOnline) return false;

    const isActivated = await userModel.checkActivation();
    if (!isActivated) return false;

    this.cleanUp();

    return this.saveRemote();
  }
}

export const useValidateCheck = (sample: Sample) => {
  const alert = useAlert();

  const validate = () => {
    const invalids = sample.validateRemote();
    if (invalids) {
      alert({
        header: 'Survey incomplete',
        message: getDeepErrorMessage(invalids),
        buttons: [
          {
            text: 'Got it',
            role: 'cancel',
          },
        ],
      });
      return false;
    }
    return true;
  };

  return validate;
};

export default AppSample;
