import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { Main, Gallery } from '@apps';
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

class SpeciesProfile extends React.Component {
  static contextType = IonLifeCycleContext;

  state = {
    showGallery: null,
    activeSlide: 0,
  };

  slider = React.createRef();

  getFullScreenPhotoViewer = () => {
    const { species } = this.props;
    const { showGallery } = this.state;

    let items = [];
    let initialSlide = 0;

    const setShowGallery = () =>
      this.setState({
        showGallery: false,
      });

    if (Number.isInteger(showGallery)) {
      const getImageSource = src => src;

      items = species.images.map(getImageSource);
      initialSlide = showGallery;
    }

    if (!items.length) {
      return null;
    }

    return (
      <Gallery
        isOpen
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
    const { species } = this.props;
    const { images } = species;

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
    const getCaptionListItem = caption => {
      return (
        <li key={caption}>
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
        <div className="species-card-content">{extraText}</div>
      </>
    );
  };

  getIntroText = ({ introText }) => {
    if (!introText) {
      return null;
    }

    return (
      <>
        <div className="species-card-content">{introText}</div>
      </>
    );
  };

  byKey = (captureKey1, captureKey2) =>
    captureKey1[0].localeCompare(captureKey2[0]);

  render() {
    const { species } = this.props;

    const { activeSlide } = this.state;

    return (
      <>
        {this.getFullScreenPhotoViewer()}

        <Main id="species-profile">
          {this.getSlides()}

          <div className="species-captions">
            <ol>{this.getCaption(species.images[activeSlide])}</ol>
            {this.getIntroText(species.images[activeSlide])}

            <br />

            {this.getDescription(species.images[activeSlide])}
          </div>
        </Main>
      </>
    );
  }
}

SpeciesProfile.propTypes = exact({
  species: PropTypes.object,
});

export default SpeciesProfile;
