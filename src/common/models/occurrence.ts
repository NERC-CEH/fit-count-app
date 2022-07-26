import { Occurrence, OccurrenceAttrs, validateRemoteModel } from '@flumens';
import Media from './media';

type Attrs = OccurrenceAttrs & {
  count: number;
};

export default class AppOccurrence extends Occurrence {
  static fromJSON(json: any) {
    return super.fromJSON(json, Media);
  }

  attrs: Attrs = this.attrs;

  validateRemote = validateRemoteModel;

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

  isDisabled() {
    return this.isUploaded();
  }
}
