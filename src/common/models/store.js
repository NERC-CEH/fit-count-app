import { Store } from '@apps';

// eslint-disable-next-line
export const genericStore = new Store({
  storeName: 'generic',
  debugging: process.env.NODE_ENV === 'development',
});