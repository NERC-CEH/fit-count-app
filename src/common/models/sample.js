import { Sample, showInvalidsMessage } from '@flumens';
import config from 'common/config';
import userModel from './user';
import GPSExtension from './sampleGPSExt';
import Media from './media';
import surveyConfig from '../../Survey/config';
import Occurrence from './occurrence';
import { modelStore } from './store';
import VibrateExtension from './sample_vibrate_ext';

class AppSample extends Sample {
  static fromJSON(json) {
    return super.fromJSON(json, Occurrence, AppSample, Media);
  }

  store = modelStore;

  constructor(...args) {
    super(...args);

    this.remote.url = `${config.backend.indicia.url}/index.php/services/rest`;
    // eslint-disable-next-line
    this.remote.headers = async () => ({
      Authorization: `Bearer ${await userModel.getAccessToken()}`,
    });

    Object.assign(this, GPSExtension);
    this.survey = surveyConfig;

    this.gpsExtensionInit();
  }

  isDisabled = () => this.isUploaded();

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
    const hasAbundance = occ => occ.attrs.count;
    const addUpOccurrencesCounts = (acc, occ) => acc + occ.attrs.count;

    return this.occurrences
      .filter(hasAbundance)
      .reduce(addUpOccurrencesCounts, 0);
  };

  upload() {
    if (this.remote.synchronising) {
      return;
    }

    const invalids = this.validateRemote();
    if (invalids) {
      showInvalidsMessage(invalids);
      return;
    }

    if (this.isGPSRunning()) {
      this.stopGPS();
    }

    this.saveRemote();
  }
}

Sample.prototype = Object.assign(Sample.prototype, VibrateExtension);

export default AppSample;
