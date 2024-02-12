import { Device } from '@capacitor/device';

async function getLangCodeFromDevice(languages: any) {
  const { value: deviceFullLangCode } = await Device.getLanguageTag(); // 'en-US'
  const { value: deviceLangCode } = await Device.getLanguageCode(); // 'en'

  if (deviceFullLangCode in languages) {
    return deviceFullLangCode;
  }

  if (deviceLangCode in languages) {
    return languages[deviceLangCode].default || deviceLangCode;
  }

  return '';
}

export default getLangCodeFromDevice;
