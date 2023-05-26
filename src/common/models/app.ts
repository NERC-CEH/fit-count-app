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
  }

  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: genericStore });
export default appModel;
