import { Occurrence } from '@flumens';
import Media from './media';

export default class AppOccurrence extends Occurrence {
  static fromJSON(json) {
    return super.fromJSON(json, Media);
  }

  // eslint-disable-next-line class-methods-use-this
  validateRemote() {
    return null;
  }

  _hasZeroCount() {
    return !this.attrs.count;
  }

  getSubmission() {
    if (this._hasZeroCount()) {
      // skip the occurrence from submission
      return null;
    }

    return super.getSubmission();
  }
}
