import { observe } from 'mobx';
import { Model, ModelAttrs } from '@flumens';
import ActivitiesExtension from './appActivitiesExt';
import { genericStore } from './store';

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

export class AppModel extends Model {
  syncActivities: any; // from extension

  constructor(options: any) {
    super(options);

    // fix old language choices - TODO: remove in the future
    this.ready?.then(() => {
      if (this.attrs.language === 'es') {
        console.log('Changing es to es-CL');
        this.attrs.language = 'es-CL';
        this.save();
      } else if (this.attrs.language === 'pt') {
        console.log('Changing pt to pt-BR');
        this.attrs.language = 'pt-BR';
        this.save();
      }
    });

    Object.assign(this, ActivitiesExtension);

    this.ready?.then(() => {
      const shouldSyncFirstTime =
        !this.attrs.activities?.length && this.attrs.country === 'UK';

      if (shouldSyncFirstTime) {
        this.syncActivities();
      }

      // add country change auto-sync
      const syncActivities = ({ newValue }: any) =>
        !!newValue && this.syncActivities();
      observe(this.attrs, 'country', syncActivities);
    });
  }

  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: genericStore });
export default appModel;
