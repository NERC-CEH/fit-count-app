import { SampleCollection } from '@flumens';
import config from 'common/config';
import Occurrence from 'common/models/occurrence';
import Sample from '../sample';
import { samplesStore } from '../store';
import userModel from '../user';

console.log('SavedSamples: initializing');

const samples = new SampleCollection<Sample>({
  store: samplesStore,
  Model: Sample,
  Occurrence,
  url: config.backend.indicia.url,
  getAccessToken: () => userModel.getAccessToken(),
}) as any;

export default samples;
