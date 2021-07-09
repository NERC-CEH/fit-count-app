import species from './insects.json';
import speciesPhotos from './photos.json';
import './photos/index';
import './thumbnails';

const extendImagesWithCaptions = sp => {
  const byId = ({ id }) => id === sp.id;
  const spPhotos = Object.values(speciesPhotos).filter(byId);

  let introText = '';
  let extraText = '';

  const getPhotoWithCaptions = photo => {
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
    return {
      src: `/images/${sp.id}_${photo.pictureId}.jpg`,
      captions,
      introText,
      extraText,
      ...photo,
    };
  };

  sp.images = spPhotos.map(getPhotoWithCaptions); // eslint-disable-line
};

species.forEach(extendImagesWithCaptions);

export default species;
