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

const fetchAndSave = async sheet => {
  const sheetData = await fetchSheet({ drive, file, sheet });
  saveSpeciesToFile(sheetData, sheet);
};

function checkTranslationsExist(data, keysToCheck) {
  const missing = [];
  const jsonData = po2json.parseFileSync('../translations/interface/en.pot');
  const checkExists = sp => {
    const checkKeyValyeExistsInTranslations = key => {
      const text = sp[key];
      if (text && !jsonData[text]) {
        missing.push(`⛑  Missing translation:\n ${text}`);
      }
    };
    keysToCheck.forEach(checkKeyValyeExistsInTranslations);
  };
  data.forEach(checkExists);

  if (missing.length) {
    console.error(`\n\n${missing.join('\n\n')}\n`);
  }
}

const getData = async () => {
  await fetchAndSave('insects');
  await fetchAndSave('habitats');
  // await fetchAndSave('flowers');
  const sheetData = await fetchSheet({ drive, file, sheet: 'photos' });
  saveSpeciesToFile(sheetData, 'photos');
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

  console.log('All done! 🚀');
};

getData();
