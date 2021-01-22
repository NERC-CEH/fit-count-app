/* eslint-disable @getify/proper-arrows/name */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import en from './interface/en.pot';
import es from './interface/es.po';
import el from './interface/el_GR.po';
import pt from './interface/pt_BR.po';

const rawToKeyVal = lang =>
  Object.entries(lang).reduce((agg, pair) => {
    const [key, translation] = pair;
    if (!key) {
      return agg;
    }

    const [, val, ...pluralVals] = translation;
    if (!val) {
      return agg;
    }

    if (pluralVals.length) {
      const pluralValsWrap = (plural, index) => {
        agg[`${key}_${index + 1}`] = plural;
      };

      pluralVals.forEach(pluralValsWrap);
    }

    agg[key] = val; // eslint-disable-line no-param-reassign
    return agg;
  }, {});

export default {
  en: {
    interface: rawToKeyVal(en),
  },
  es: {
    interface: rawToKeyVal(es),
  },
  el: {
    interface: rawToKeyVal(el),
  },
  pt: {
    interface: rawToKeyVal(pt),
  },
};
