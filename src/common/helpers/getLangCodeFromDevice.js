import { Plugins } from '@capacitor/core';

const { Device } = Plugins;

function getLangCodeFromDevice(languages) {
  const languageFromDevice = Device.getLanguageCode();

  const findLanguageCode = deviceISOkey => {
    const byLanguageCode = languageISOKey =>
      languageISOKey === deviceISOkey.value;

    return languages.find(byLanguageCode);
  };

  return languageFromDevice.then(findLanguageCode);
}

export default getLangCodeFromDevice;
