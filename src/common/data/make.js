const fs = require('fs');
const fetchSheet = require('@flumens/fetch-onedrive-excel'); // eslint-disable-line
const po2json = require('po2json'); // eslint-disable-line

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

function checkTranslationsExist(data, keysToCheck) {
  const missing = [];
  const jsonData = po2json.parseFileSync('../translations/interface/en.pot');
  const checkExists = sp => {
    const checkKeyValyeExistsInTranslations = key => {
      const text = sp[key];
      if (text && !jsonData[text]) {
        missing.push(`# ${key} \nmsgid "${text}"\nmsgstr "${text}"`);
        missing.push();
      }
    };
    keysToCheck.forEach(checkKeyValyeExistsInTranslations);
  };
  data.forEach(checkExists);

  if (missing.length) {
    console.warn(`\n⛑  Missing translations:\n`);
    console.warn('\x1b[43m', `${missing.join('\n\n')}\n`, '\x1b[0m');
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
  checkTranslationsExist(sheetData, ['name']);
  checkImagesExist(
    sheetData,
    `${process.env.INIT_CWD}/src/common/data/thumbnails`,
    ({ id }) => `${id}.png` // eslint-disable-line @getify/proper-arrows/name
  );

  sheetData = await fetchSheet({ drive, file, sheet: 'habitats' });
  saveSpeciesToFile(sheetData, 'habitats');
  checkTranslationsExist(sheetData, ['value']);

  sheetData = await fetchSheet({ drive, file, sheet: 'flowers' });
  saveSpeciesToFile(sheetData, 'flowers');
  checkTranslationsExist(sheetData, ['name', 'type']);
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
  checkTranslationsExist(sheetData, [
    'intro_text',
    'caption_1',
    'caption_2',
    'caption_3',
    'caption_4',
    'caption_5',
    'caption_6',
    'extraText',
  ]);
  checkImagesExist(
    sheetData,
    `${process.env.INIT_CWD}/src/common/data/photos`,
    ({ id, pictureId }) => `${id}_${pictureId}.jpg` // eslint-disable-line @getify/proper-arrows/name
  );

  console.log('All done! 🚀');
};

getData();
