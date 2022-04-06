import { initStoredSamples } from '@flumens';
import Log from 'helpers/log';
import Sample from 'models/sample';
import { modelStore } from './store';

Log('SavedSamples: initializing');
const savedSamples = initStoredSamples(modelStore, Sample);

export { savedSamples as default };
