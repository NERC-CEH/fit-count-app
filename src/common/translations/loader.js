import en from './interface/en.pot';
import es from './interface/es.po';
import el from './interface/el.po';
import pt from './interface/pt_BR.po';
import cy from './interface/cy.po';
import se from './interface/sv_SE.po';
import de from './interface/de_DE.po';

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
        // eslint-disable-next-line no-param-reassign
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
  cy: {
    interface: rawToKeyVal(cy),
  },
  se: {
    interface: rawToKeyVal(se),
  },
  de: {
    interface: rawToKeyVal(de),
  },
};
