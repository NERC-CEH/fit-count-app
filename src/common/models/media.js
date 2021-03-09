import { Media } from '@apps';
import { isPlatform } from '@ionic/react';
import Log from 'helpers/log';
import { Capacitor, Plugins, FilesystemDirectory } from '@capacitor/core';

const { Filesystem } = Plugins;

export default class AppMedia extends Media {
  async destroy(silent) {
    // remove from internal storage
    if (!isPlatform('hybrid') || window.testing) {
      if (!this.parent) {
        return null;
      }

      this.parent.media.remove(this);

      if (silent) {
        return null;
      }

      return this.parent.save();
    }

    const URL = this.attrs.data;

    try {
      await Filesystem.deleteFile({
        path: URL,
        directory: FilesystemDirectory.Data,
      });

      if (!this.parent) {
        return null;
      }

      this.parent.media.remove(this);

      if (silent) {
        return null;
      }

      return this.parent.save();
    } catch (err) {
      Log(err, 'e');
    }

    return null;
  }

  getURL() {
    const { data: name, path } = this.attrs;

    if (!isPlatform('hybrid') || process.env.NODE_ENV === 'test') {
      return name;
    }

    return Capacitor.convertFileSrc(`${path}/${name}`);
  }

  // eslint-disable-next-line class-methods-use-this
  validateRemote() {
    return null;
  }
}
