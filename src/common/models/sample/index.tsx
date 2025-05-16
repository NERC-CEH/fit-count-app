import { IObservableArray } from 'mobx';
import { useTranslation } from 'react-i18next';
import {
  Sample as SampleOriginal,
  SampleAttrs,
  SampleOptions,
  ModelValidationMessage,
  device,
  useAlert,
  SampleMetadata,
} from '@flumens';
import config from 'common/config';
import { Activity } from 'models/app';
import userModel from 'models/user';
import surveyConfig from 'Survey/config';
import Media from '../media';
import Occurrence from '../occurrence';
import { samplesStore } from '../store';
import GPSExtension from './GPSExt';
import VibrateExtension from './vibrateExt';

type Attrs = SampleAttrs & {
  date: any;
  location: any;
  country: string;
  activity?: Activity;
  surveyStartTime?: any;
  'weather-wind'?: any;
  'location-name'?: any;
};

type Metadata = SampleMetadata & {
  pausedTotalTime?: number;
  saved?: number | boolean;
};

export default class Sample extends SampleOriginal<Attrs, Metadata> {
  declare occurrences: IObservableArray<Occurrence>;

  declare samples: IObservableArray<Sample>;

  declare media: IObservableArray<Media>;

  declare parent?: Sample;

  gpsExtensionInit: any; // from extension

  startGPS: any; // from extension

  stopGPS: any; // from extension

  isGPSRunning: any; // from extension

  constructor(options: SampleOptions<Attrs>) {
    super({ ...options, Occurrence, Media, store: samplesStore });

    this.remote.url = config.backend.indicia.url;
    this.remote.getAccessToken = () => userModel.getAccessToken();

    Object.assign(this, GPSExtension);
    Object.assign(this, VibrateExtension);

    this.survey = surveyConfig as any;

    this.gpsExtensionInit();
  }

  getSurvey = () => this.survey as any;

  destroy(silent?: boolean) {
    this.cleanUp();
    return super.destroy(silent);
  }

  cleanUp() {
    this.stopGPS();
  }

  hasCountdownTimedOut = (threshold = 0) => {
    if (!this.data.surveyStartTime) {
      return false;
    }

    const startTime = new Date(this.data.surveyStartTime);

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
    const hasAbundance = (occ: Occurrence) => occ.data.count;
    const addUpOccurrencesCounts = (acc: number, occ: Occurrence) =>
      acc + occ.data.count;

    return this.occurrences
      .filter(hasAbundance)
      .reduce(addUpOccurrencesCounts, 0);
  };

  shouldUseActivities = () => this.data.country === 'UK';

  getSurveyStepCount = () => {
    const { SURVEY_STEP_COUNT } = this.getSurvey();
    const needsLocationName =
      !this.data.location?.latitude || this.data['location-name'];

    let count = needsLocationName ? SURVEY_STEP_COUNT + 1 : SURVEY_STEP_COUNT;

    if (this.shouldUseActivities()) count++;

    return count;
  };

  async upload() {
    if (this.remote.synchronising || this.isUploaded) return true;

    const invalids = this.validateRemote();
    if (invalids) return false;

    if (!device.isOnline) return false;

    const isActivated = await userModel.checkActivation();
    if (!isActivated) return false;

    this.cleanUp();

    return this.saveRemote();
  }
}

export const useValidateCheck = (sample?: Sample) => {
  const alert = useAlert();
  const { t } = useTranslation();

  const showValidateCheck = () => {
    const invalids = sample?.validateRemote();
    if (invalids) {
      alert({
        header: t('Survey incomplete'),
        skipTranslation: true,
        message: <ModelValidationMessage {...invalids} />,
        buttons: [
          {
            text: t('Got it'),
            role: 'cancel',
          },
        ],
      });
      return false;
    }
    return true;
  };

  return showValidateCheck;
};
