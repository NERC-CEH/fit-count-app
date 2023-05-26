const fs = require('fs');
// require('dotenv').config({ silent: true, path: '../../../.env' }); // eslint-disable-line
const fetchSheet = require('@flumens/fetch-onedrive-excel'); // eslint-disable-line

const countries = ['UK', 'BR', 'CL', 'CY', 'AR', 'IE', 'DE', 'SE', 'HR', 'PT'];

const drive =
  'sites/flumensio.sharepoint.com,6230bb4b-9d52-4589-a065-9bebfdb9ce63,21520adc-6195-4b5f-91f6-7af0b129ff5c/drive';

const file = '01UPL42ZTFIUHIPTVXDZFILFTNG4ABDBBT';

function saveSpeciesToFile(data, sheetName) {
  const saveSpeciesToFileWrap = (resolve, reject) => {
    const fileName = `./${sheetName}.json`;
    console.log(`Writing ${fileName}`);

    const dataOption = err => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    };

    fs.writeFile(fileName, JSON.stringify(data, null, 2), dataOption);
  };
  return new Promise(saveSpeciesToFileWrap);
}

function getGettext({ text, documentName, key, countryCodes }) {
  const keyText = `# ${documentName} ${key}\n`;
  const referenceText = `#: ${countryCodes.join(' ')}\n`;
  const sourceText = `msgid "${text}"\n`;
  const translationText = `msgstr "${text}"`;

  return `${keyText}${referenceText}${sourceText}${translationText}`;
}

const existingTranslationStrings = [];
function generateTranslations(rows, keysToCheck, documentName = '') {
  const translations = {};

  const parseRow = row => {
    const parseKeyInRow = key => {
      const text = row[key];
      if (!text) return;

      const countryCodes = [];
      const processCountry = country =>
        row[country] && countryCodes.push(country);
      countries.forEach(processCountry);

      if (translations[text]) {
        // add extra country codes if translation exists but for different country
        translations[text].countryCodes = [
          ...new Set([...translations[text].countryCodes, ...countryCodes]),
        ];
        return;
      }

      if (existingTranslationStrings.includes(text)) return; // no duplicates must occur between different documents

      translations[text] = { text, documentName, key, countryCodes };

      existingTranslationStrings.push(text);
    };
    keysToCheck.forEach(parseKeyInRow);
  };
  rows.forEach(parseRow);

  const hasTranslations = Object.values(translations).length;
  if (!hasTranslations) return '';

  return Object.values(Object.values(translations).map(getGettext)).join(
    '\n\n'
  );
}

function saveTranslations(translationsText) {
  const input = fs.readFileSync('../translations/interface/en.pot', 'utf8');

  let newText = input.replace(/# =====(.*\n.*)*/, '');

  newText += `# ============================================================================
# ============================================================================
# ============================================================================
# AUTOMATICALLY GENERATED LIST STARTS HERE - do not manually modify past this!
# ============================================================================
# ============================================================================
# ============================================================================

${translationsText}
`;
  fs.writeFileSync('../translations/interface/en.pot', newText);
}

function cleanUpTrailingWhiteSpace(data, keysToCheck) {
  const checkExists = sp => {
    const checkKeyValyeExistsInTranslations = key => {
      if (sp[key]?.includes('\n')) {
        // eslint-disable-next-line no-param-reassign
        sp[key] = sp[key].replaceAll('\n\n', ' ').replaceAll('\n', '');
      }
    };
    keysToCheck.forEach(checkKeyValyeExistsInTranslations);
  };
  data.forEach(checkExists);
}

function checkImagesExist(data, path, fileNameProcess) {
  const missing = [];
  const checkImage = item => {
    const fileName = fileNameProcess ? fileNameProcess(item) : `${item.id}.jpg`;
    const imagePath = `${path}/${fileName}`;
    const exists = fs.existsSync(imagePath);
    if (!exists) {
      missing.push(imagePath);
    }
  };
  data.forEach(checkImage);

  if (missing.length) {
    console.warn(`\n⛑  Missing images:\n`);
    console.warn('\x1b[43m', `${missing.join('\n')}\n`, '\x1b[0m');
  }
}

const getData = async () => {
  const translations = [];

  let sheetData = await fetchSheet({ drive, file, sheet: 'insects' });
  saveSpeciesToFile(sheetData, 'insects');
  translations.push(generateTranslations(sheetData, ['name'], 'insects'));
  checkImagesExist(
    sheetData,
    `${process.env.INIT_CWD}/src/common/data/thumbnails`,
    ({ id }) => `${id}.png` // eslint-disable-line @getify/proper-arrows/name
  );

  sheetData = await fetchSheet({ drive, file, sheet: 'habitats' });
  saveSpeciesToFile(sheetData, 'habitats');
  translations.push(generateTranslations(sheetData, ['value'], 'habitats'));

  sheetData = await fetchSheet({ drive, file, sheet: 'flowers' });
  saveSpeciesToFile(sheetData, 'flowers');
  translations.push(generateTranslations(sheetData, ['name'], 'flowers'));
  checkImagesExist(
    sheetData,
    `${process.env.INIT_CWD}/src/Survey/Flower/images`
  );

  sheetData = await fetchSheet({ drive, file, sheet: 'insect-guide-photos' });
  saveSpeciesToFile(sheetData, 'photos');
  cleanUpTrailingWhiteSpace(sheetData, [
    'intro_text',
    'caption_1',
    'caption_2',
    'caption_3',
    'caption_4',
    'caption_5',
    'caption_6',
    'extraText',
  ]);
  translations.push(
    generateTranslations(
      sheetData,
      [
        'intro_text',
        'caption_1',
        'caption_2',
        'caption_3',
        'caption_4',
        'caption_5',
        'caption_6',
        'extraText',
      ],
      'photos'
    )
  );
  checkImagesExist(
    sheetData,
    `${process.env.INIT_CWD}/src/common/data/photos`,
    ({ id, pictureId }) => `${id}_${pictureId}.jpg` // eslint-disable-line @getify/proper-arrows/name
  );

  saveTranslations(translations.join('\n\n'));

  console.log('All done! 🚀');
};

getData();
