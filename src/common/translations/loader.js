import en from './interface/en.pot';
import esCL from './interface/es_CL.po';
import el from './interface/el.po';
import ptBR from './interface/pt_BR.po';
import ptPT from './interface/pt_PT.po';
import cy from './interface/cy.po';
import se from './interface/sv_SE.po';
import de from './interface/de_DE.po';
import hr from './interface/hr_HR.po';

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
  'es-CL': {
    interface: rawToKeyVal(esCL),
  },
  el: {
    interface: rawToKeyVal(el),
  },
  'pt-BR': {
    interface: rawToKeyVal(ptBR),
  },
  'pt-PT': {
    interface: rawToKeyVal(ptPT),
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
  hr: {
    interface: rawToKeyVal(hr),
  },
};
