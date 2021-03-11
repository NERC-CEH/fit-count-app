import species from './insects.json';
import * as speciesResources from './resources';
import speciesPhotos from './photos.json';

const extendWithResources = sp => {
  return Object.assign(sp, speciesResources[sp.id]);
};

species.forEach(extendWithResources);

const extendImagesWithCaptions = sp => {
  const byId = ({ id }) => id === sp.id;
  const spPhotos = Object.values(speciesPhotos).filter(byId);

  if (spPhotos.length !== sp.images.length) {
    throw new Error('Photos missing');
  }

  let introText = '';
  let extraText = '';

  const getPhotoWithCaptions = (img, index) => {
    const byIndex = (_, idx) => index === idx;
    const photo = spPhotos.find(byIndex);

    const getCaptions = image => {
      const byCaption = key => key.includes('caption_');
      const byAscendingOrder = (caption1, caption2) =>
        caption1[0].localeCompare(caption2[0]);
      const getCaptionText = captionProp => image[captionProp];

      introText = image.intro_text;
      extraText = image.extraText;

      return Object.keys(image)
        .filter(byCaption)
        .sort(byAscendingOrder)
        .map(getCaptionText);
    };

    const captions = getCaptions(photo);

    return { src: img, captions, introText, extraText };
  };

  sp.images = sp.images.map(getPhotoWithCaptions); // eslint-disable-line
};

species.forEach(extendImagesWithCaptions);

export default species;
