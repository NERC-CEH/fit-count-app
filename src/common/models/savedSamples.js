import { initStoredSamples } from '@flumens';
import Sample from 'models/sample';
import { modelStore } from './store';

console.log('SavedSamples: initializing');
const savedSamples = initStoredSamples(modelStore, Sample);

export { savedSamples as default };
