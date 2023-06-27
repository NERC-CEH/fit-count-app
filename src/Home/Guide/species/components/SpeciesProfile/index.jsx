import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Main, Gallery } from '@flumens';
import { IonSlides, IonSlide, IonLifeCycleContext } from '@ionic/react';
import { Trans as T } from 'react-i18next';
import ImageWithBackground from 'common/Components/ImageWithBackground';
import './styles.scss';

const fixIonicSlideBug = e => {
  // TODO: remove once bug is fixed
  // https://github.com/ionic-team/ionic/issues/19641
  // https://github.com/ionic-team/ionic/issues/19638

  e.target.update();
};

class SpeciesProfile extends Component {
  static contextType = IonLifeCycleContext;

  state = {
    showGallery: null,
    activeSlide: 0,
  };

  slider = createRef();

  getFullScreenPhotoViewer = () => {
    const { showGallery } = this.state;
    const images = this.getImages();

    let items = [];
    let initialSlide = 0;

    const setShowGallery = () =>
      this.setState({
        showGallery: false,
      });

    if (Number.isInteger(showGallery)) {
      const getImageSource = src => src;
      items = images.map(getImageSource);
      initialSlide = showGallery;
    }

    return (
      <Gallery
        isOpen={!!items.length}
        items={items}
        initialSlide={initialSlide}
        onClose={setShowGallery}
      />
    );
  };

  showPhotoInFullScreen = index => this.setState({ showGallery: index });

  getActiveSlide = async () => {
    const activeSlide = await this.slider.current.getActiveIndex();

    this.setState({
      activeSlide,
    });
  };

  getSlides = () => {
    const images = this.getImages();

    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };

    const getSlide = ({ src }, index) => {
      const showPhotoInFullScreenWrap = () => this.showPhotoInFullScreen(index);

      return (
        <IonSlide
          key={index}
          class="species-profile-photo"
          onClick={showPhotoInFullScreenWrap}
        >
          <ImageWithBackground src={src} />
        </IonSlide>
      );
    };

    const slideImage = images.map(getSlide);

    return (
      <IonSlides
        pager
        options={slideOpts}
        ref={this.slider}
        onIonSlideWillChange={this.getActiveSlide}
        onIonSlidesDidLoad={fixIonicSlideBug}
      >
        {slideImage}
      </IonSlides>
    );
  };

  getCaption = ({ captions }) => {
    const getCaptionListItem = (caption, index) => {
      return (
        <li key={caption + index}>
          <T>{caption}</T>
        </li>
      );
    };
    return captions.map(getCaptionListItem);
  };

  getDescription = ({ extraText }) => {
    if (!extraText) {
      return null;
    }

    return (
      <>
        <div className="species-card-content">
          <T>{extraText}</T>
        </div>
      </>
    );
  };

  getIntroText = ({ introText }) => {
    if (!introText) {
      return null;
    }

    return (
      <>
        <div className="species-card-content">
          <T>{introText}</T>
        </div>
      </>
    );
  };

  getImages() {
    const { species, appModel } = this.props;
    const { images } = species;
    const { country } = appModel.attrs;

    const byCountry = img => img[country];
    return images.filter(byCountry);
  }

  byKey = (captureKey1, captureKey2) =>
    captureKey1[0].localeCompare(captureKey2[0]);

  render() {
    const { species } = this.props;

    if (!species) {
      return null;
    }

    const { activeSlide } = this.state;

    const images = this.getImages();
    if (!images.length) {
      console.error("This species doesn't have any guide photos", species.id);
      return null;
    }

    return (
      <>
        {this.getFullScreenPhotoViewer()}

        <Main id="species-profile">
          {this.getSlides()}

          <div className="species-captions">
            <ol>{this.getCaption(images[activeSlide])}</ol>
            {this.getIntroText(images[activeSlide])}

            <br />

            {this.getDescription(images[activeSlide])}
          </div>
        </Main>
      </>
    );
  }
}

SpeciesProfile.propTypes = exact({
  species: PropTypes.object,
  appModel: PropTypes.object,
});

export default SpeciesProfile;
