import { IObservableArray } from 'mobx';
import {
  Occurrence as OccurrenceOriginal,
  OccurrenceOptions,
  OccurrenceAttrs,
  validateRemoteModel,
  Sample,
} from '@flumens';
import Media from './media';

type Attrs = OccurrenceAttrs & {
  count: number;
};

export default class Occurrence extends OccurrenceOriginal<Attrs> {
  declare media: IObservableArray<Media>;

  declare parent?: Sample;

  validateRemote = validateRemoteModel;

  constructor(options: OccurrenceOptions) {
    super({ ...options, Media });
  }

  _hasZeroCount() {
    return !this.data.count;
  }

  toDTO() {
    if (this._hasZeroCount()) {
      // skip the occurrence from submission
      return null;
    }

    return super.toDTO();
  }
}
