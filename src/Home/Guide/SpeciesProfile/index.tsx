import { useState } from 'react';
import { Trans as T } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Main, Gallery, ImageWithBackground } from '@flumens';
import './styles.scss';

type Props = {
  species: any;
  appModel: any;
};

function SpeciesProfile(props: Props) {
  const [showGallery, setShowGallery] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const getImages = () => {
    const { species, appModel } = props;
    const { images } = species;
    const { country } = appModel.data;
    const byCountry = (img: any) => img[country];
    return images.filter(byCountry);
  };

  const getFullScreenPhotoViewer = () => {
    const images = getImages();
    let items = [];
    let initialSlide = 0;

    if (Number.isInteger(showGallery)) {
      items = images;
      initialSlide = showGallery as any;
    }

    return (
      <Gallery
        isOpen={!!items.length}
        items={items}
        initialSlide={initialSlide}
        onClose={() => setShowGallery(false)}
      />
    );
  };

  const showPhotoInFullScreen = (index: any) => setShowGallery(index);

  const getActiveSlide = async (swiper: SwiperClass) => {
    const idx = swiper.realIndex;
    setActiveSlide(idx);
  };

  const getSlides = () => {
    const images = getImages();

    const getSlide = ({ src }: any, index: any) => {
      const showPhotoInFullScreenWrap = () => showPhotoInFullScreen(index);

      return (
        <SwiperSlide
          key={index}
          className="species-profile-photo"
          onClick={showPhotoInFullScreenWrap}
        >
          <ImageWithBackground src={src} />
        </SwiperSlide>
      );
    };

    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };

    const slideImage = images.map(getSlide);

    return (
      <Swiper
        modules={[Pagination]}
        pagination
        onSlideChange={getActiveSlide}
        {...slideOpts}
      >
        {slideImage}
      </Swiper>
    );
  };

  const getCaption = ({ captions }: any) => {
    const getCaptionListItem = (caption: any, index: any) => (
      <li key={caption + index}>
        <T>{caption}</T>
      </li>
    );

    return captions.map(getCaptionListItem);
  };

  const getDescription = ({ extraText }: any) => {
    if (!extraText) return null;

    return (
      <>
        <div className="species-card-content">
          <T>{extraText}</T>
        </div>
      </>
    );
  };

  const getIntroText = ({ introText }: any) => {
    if (!introText) return null;

    return (
      <>
        <div className="species-card-content">
          <T>{introText}</T>
        </div>
      </>
    );
  };

  const { species } = props;
  if (!species) return null;

  const images = getImages();
  if (!images.length) {
    if (species.id !== 'otherBees')
      console.error("This species doesn't have any guide photos", species.id);
    return null;
  }

  return (
    <>
      {getFullScreenPhotoViewer()}

      <Main id="species-profile">
        {getSlides()}
        <div className="species-captions">
          <ol>{getCaption(images[activeSlide])}</ol>
          {getIntroText(images[activeSlide])}
          <br />
          {getDescription(images[activeSlide])}
        </div>
      </Main>
    </>
  );
}

export default SpeciesProfile;
