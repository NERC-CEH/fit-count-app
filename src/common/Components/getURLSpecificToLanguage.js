import config from 'common/config';
import appModel from 'models/app';

function getURLSpecificToLanguage(path) {
  const baseURL = config.backend.url;

  const defaultURL = `${baseURL}/${path}`;

  const specificToLanguageURL = `${baseURL}/${appModel.attrs.language}/${path}`;

  const isLanguageDefault = appModel.attrs.language === 'en';

  const url = isLanguageDefault ? defaultURL : specificToLanguageURL;

  return url;
}

export default getURLSpecificToLanguage;
