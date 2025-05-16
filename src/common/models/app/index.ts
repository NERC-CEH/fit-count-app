import { observe } from 'mobx';
import { Model, ModelAttrs } from '@flumens';
import { mainStore } from 'models/store';
import ActivitiesExtension from './activitiesExt';

export interface Activity {
  id: number;
  name: string;
  countryName?: string;
  countryCode?: string;
  websiteUrl?: string;
}

export interface Attrs extends ModelAttrs {
  sendAnalytics: boolean;
  appSession: number;
  language: string;
  country: string;

  feedbackGiven: boolean;
  showedWelcome: boolean;

  activities?: Activity[] | null;
  pastActivities?: any;

  // draft survey pointers
  'draftId:survey'?: string;

  // tips
  showSurveysDeleteTip: boolean;
  showSurveyUploadTip: boolean;
}

const defaults: Attrs = {
  sendAnalytics: true,
  appSession: 0,
  language: '',
  country: '',

  activities: null,
  pastActivities: [],

  feedbackGiven: false,
  showedWelcome: false,

  // draft survey pointers
  'draftId:survey': '',

  // tips
  showSurveysDeleteTip: true,
  showSurveyUploadTip: true,
};

export class AppModel extends Model<Attrs> {
  syncActivities: any; // from extension

  constructor(options: any) {
    super({ ...options, data: { ...defaults, ...options.data } });

    Object.assign(this, ActivitiesExtension);

    this.ready?.then(() => {
      const shouldSyncFirstTime =
        !this.data.activities?.length && this.data.country === 'UK';

      if (shouldSyncFirstTime) {
        this.syncActivities();
      }

      // add country change auto-sync
      const syncActivities = ({ newValue }: any) =>
        !!newValue && this.syncActivities();
      observe(this.data, 'country', syncActivities);
    });
  }

  resetDefaults() {
    return super.reset(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: mainStore });
export default appModel;
