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

export function getPending() {
  const byUploadStatus = (sample: Sample) =>
    !sample.syncedAt && sample.metadata.saved;

  return samples.filter(byUploadStatus);
}

export default samples;
