import { Model, ModelAttrs } from '@flumens';
import { genericStore } from './store';

export interface Attrs extends ModelAttrs {
  sendAnalytics: boolean;
  appSession: number;
  language: string;
  country: string;

  feedbackGiven: boolean;
  showedWelcome: boolean;

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

  feedbackGiven: false,
  showedWelcome: false,

  // draft survey pointers
  'draftId:survey': '',

  // tips
  showSurveysDeleteTip: true,
  showSurveyUploadTip: true,
};

export class AppModel extends Model {
  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: genericStore });
export default appModel;
