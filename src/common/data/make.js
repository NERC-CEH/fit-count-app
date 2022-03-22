const fs = require('fs');
// require('dotenv').config({ silent: true, path: '../../../.env' }); // eslint-disable-line
const fetchSheet = require('@flumens/fetch-onedrive-excel'); // eslint-disable-line
const gettextParser = require('gettext-parser'); // eslint-disable-line import/no-extraneous-dependencies

const countries = ['UK', 'BR', 'CL', 'CY', 'AR', 'IE'];

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

function checkTranslationsExist(data, keysToCheck, documentName = '') {
  const missing = {};
  const incorrect = [];
  const input = fs.readFileSync('../translations/interface/en.pot');
  let jsonData = gettextParser.po.parse(input);
  [jsonData] = Object.values(jsonData.translations);

  const checkExists = sp => {
    const checkKeyValyeExistsInTranslations = key => {
      const text = sp[key];
      const translation = jsonData[text];

      const countryCodes = [];
      const processCountry = country =>
        sp[country] && countryCodes.push(country);
      countries.forEach(processCountry);

      // the key is missing in the object
      if (!text) return;

      if (!translation) {
        if (missing[text]) {
          // already exists from other row
          missing[text].referenceText = [
            ...new Set([...missing[text].referenceText, ...countryCodes]),
          ];
          return;
        }

        const keyText = `# ${documentName} ${key}`;
        const referenceText = countryCodes;
        const sourceText = `msgid "${text}"`;
        const translationText = `msgstr "${text}"`;
        missing[text] = {
          keyText,
          referenceText,
          sourceText,
          translationText,
        };
        return;
      }

      if (countryCodes.length) {
        const isCountryInReference = countryCode =>
          !translation.comments?.reference?.includes(countryCode);
        const countryMissingInReference = countryCodes.some(
          isCountryInReference
        );
        if (!countryMissingInReference) return;

        const keyText = `# ${documentName} ${key} \n`;
        const referenceText = `#: ${countryCodes.join(' ')} \n`;
        const sourceText = `msgid "${text}"\n`;
        const translationText = `msgstr "${text}"`;
        incorrect.push(
          `${keyText}${referenceText}${sourceText}${translationText}`
        );
        incorrect.push();
      }
    };
    keysToCheck.forEach(checkKeyValyeExistsInTranslations);
  };
  data.forEach(checkExists);

  const hasMissing = Object.values(missing).length;
  if (hasMissing) {
    const getEntry = ({
      keyText,
      referenceText,
      sourceText,
      translationText,
    }) =>
      `${keyText}\n#: ${referenceText.join(
        ' '
      )}\n${sourceText}\n${translationText}`;

    const missingEntries = Object.values(missing).map(getEntry);

    console.warn(`\n⛑  Missing translations:\n`);
    console.warn('\x1b[43m', `${missingEntries.join('\n\n')}\n`, '\x1b[0m');
  }

  const hasIncorrect = incorrect.length;
  if (hasIncorrect) {
    console.warn(`\n⛑  Incorrect references:\n`);
    console.warn('\x1b[43m', `${incorrect.join('\n\n')}\n`, '\x1b[0m');
  }
}

function checkHasNoTrailingWhiteSpace(data, keysToCheck) {
  const missing = [];

  const checkExists = sp => {
    const checkKeyValyeExistsInTranslations = key => {
      const text = sp[key];
      if (
        (typeof str === 'string' && /^[\n]/.test(text)) ||
        /[\n]$/.test(text)
      ) {
        missing.push(text);
        missing.push();
      }
    };
    keysToCheck.forEach(checkKeyValyeExistsInTranslations);
  };
  data.forEach(checkExists);

  if (missing.length) {
    console.warn(`\n⛑  White space found:\n`);
    console.warn('\x1b[45m', `${missing.join('\n\n')}\n`, '\x1b[0m');
  }
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
  let sheetData = await fetchSheet({ drive, file, sheet: 'insects' });
  saveSpeciesToFile(sheetData, 'insects');
  checkTranslationsExist(sheetData, ['name'], 'insects');
  checkImagesExist(
    sheetData,
    `${process.env.INIT_CWD}/src/common/data/thumbnails`,
    ({ id }) => `${id}.png` // eslint-disable-line @getify/proper-arrows/name
  );

  sheetData = await fetchSheet({ drive, file, sheet: 'habitats' });
  saveSpeciesToFile(sheetData, 'habitats');
  checkTranslationsExist(sheetData, ['value'], 'habitats');

  sheetData = await fetchSheet({ drive, file, sheet: 'flowers' });
  saveSpeciesToFile(sheetData, 'flowers');
  checkTranslationsExist(sheetData, ['name'], 'flowers');
  checkImagesExist(
    sheetData,
    `${process.env.INIT_CWD}/src/Survey/Flower/images`
  );

  sheetData = await fetchSheet({ drive, file, sheet: 'insect-guide-photos' });
  saveSpeciesToFile(sheetData, 'photos');
  checkHasNoTrailingWhiteSpace(sheetData, [
    'intro_text',
    'caption_1',
    'caption_2',
    'caption_3',
    'caption_4',
    'caption_5',
    'caption_6',
    'extraText',
  ]);
  checkTranslationsExist(
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
  );
  checkImagesExist(
    sheetData,
    `${process.env.INIT_CWD}/src/common/data/photos`,
    ({ id, pictureId }) => `${id}_${pictureId}.jpg` // eslint-disable-line @getify/proper-arrows/name
  );

  console.log('All done! 🚀');
};

getData();
